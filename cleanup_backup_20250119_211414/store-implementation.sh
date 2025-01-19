#!/bin/bash

# Farben für Output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# Basis-Verzeichnisse
BASE_DIR="$(pwd)"
FEATURES_DIR="${BASE_DIR}/src/features/calculator"

# Erstelle notwendige Verzeichnisse
echo -e "${BLUE}Creating directory structure...${NC}"
mkdir -p "${FEATURES_DIR}/"{model,utils,types,constants}

# Store Implementation
echo -e "${BLUE}Implementing store...${NC}"

# 1. Campaign Factors
echo -e "${GREEN}Creating campaign factors...${NC}"
cat > "${FEATURES_DIR}/constants/campaignFactors.ts" << 'EOL'
export const WECHSELGRUENDE = [
  { id: 'work_life', label: 'Work-Life-Balance', boost: 20 },
  { id: 'gehalt', label: 'Gehaltsniveau', boost: 25 },
  { id: 'belastung', label: 'Körperliche Belastung', boost: 15 },
  { id: 'aufstieg', label: 'Aufstiegsmöglichkeiten', boost: 20 },
  { id: 'klima', label: 'Betriebsklima', boost: 15 },
  { id: 'sicherheit', label: 'Arbeitsplatzsicherheit', boost: 20 }
] as const;

export const ANREIZE = [
  { id: 'flexibel', label: 'Flexible Arbeitszeiten', boost: 25 },
  { id: 'gehalt_plus', label: 'Überdurchschnittliches Gehalt', boost: 30 },
  { id: 'gesundheit', label: 'Gesundheitsförderung', boost: 15 },
  { id: 'karriere', label: 'Karriereprogramm', boost: 20 },
  { id: 'teamevents', label: 'Regelmäßige Teamevents', boost: 10 },
  { id: 'weiterbildung', label: 'Weiterbildungsbudget', boost: 20 }
] as const;

export const HINDERUNGSGRUENDE = [
  { id: 'standort', label: 'Standort/Erreichbarkeit', reduction: 20 },
  { id: 'arbeitszeiten', label: 'Ungünstige Arbeitszeiten', reduction: 25 },
  { id: 'familie', label: 'Familiäre Gründe', reduction: 30 },
  { id: 'physisch', label: 'Körperliche Anforderungen', reduction: 20 },
  { id: 'qualifikation', label: 'Fehlende Qualifikation', reduction: 25 },
  { id: 'saison', label: 'Saisonale Unsicherheit', reduction: 25 }
] as const;

export const LOESUNGSANSAETZE = [
  { id: 'einstieg', label: 'Flexible Einstiegsmodelle', boost: 25 },
  { id: 'mobilitaet', label: 'Mobilitätsunterstützung', boost: 20 },
  { id: 'familienfreundlich', label: 'Familienfreundliche Organisation', boost: 30 },
  { id: 'qualifizierung', label: 'Qualifizierungsprogramme', boost: 25 },
  { id: 'balance', label: 'Work-Life-Balance Maßnahmen', boost: 25 },
  { id: 'integration', label: 'Soziale Integration', boost: 15 }
] as const;

export type WechselgruendeId = typeof WECHSELGRUENDE[number]['id'];
export type AnreizeId = typeof ANREIZE[number]['id'];
export type HinderungsgruendeId = typeof HINDERUNGSGRUENDE[number]['id'];
export type LoesungsansaetzeId = typeof LOESUNGSANSAETZE[number]['id'];
EOL

# 2. Calculation Utils
echo -e "${GREEN}Creating calculation utilities...${NC}"
cat > "${FEATURES_DIR}/utils/calculations.ts" << 'EOL'
export const calculateDistanceFactor = (distance: number): number => {
  return 0.01 + 0.99 * (distance / 100);
};

export const calculatePowerUpsFactor = (powerUps: Record<string, boolean>): number => {
  const activeCount = Object.values(powerUps).filter(Boolean).length;
  return 1 + (activeCount * 0.2);
};

export const calculateDurationFactor = (days: number): number => {
  return Math.min(days / 30, 12) / 12;
};

export const calculateCampaignMultiplier = (
  wechselgruende: string[],
  anreize: string[],
  hinderungsgruende: string[],
  loesungsansaetze: string[]
): number => {
  const wechselgruendeBoost = wechselgruende.length * 0.2;
  const anreizeBoost = anreize.length * 0.25;
  const hinderungsReduction = hinderungsgruende.length * 0.2;
  const loesungsBoost = loesungsansaetze.length * 0.25;

  return 1 + wechselgruendeBoost + anreizeBoost - hinderungsReduction + loesungsBoost;
};
EOL

# 3. Store Implementation
echo -e "${GREEN}Implementing main store...${NC}"
cat > "${FEATURES_DIR}/model/store.ts" << 'EOL'
import { create } from 'zustand';
import { CalculatorState } from '../types';
import { REGIONS, SEGMENTS } from '@/lib/constants';
import {
  WECHSELGRUENDE,
  ANREIZE,
  HINDERUNGSGRUENDE,
  LOESUNGSANSAETZE
} from '../constants/campaignFactors';
import {
  calculateDistanceFactor,
  calculatePowerUpsFactor,
  calculateDurationFactor,
  calculateCampaignMultiplier
} from '../utils/calculations';

interface CalculatorStore extends CalculatorState {
  updateState: (newState: Partial<CalculatorState>) => void;
  calculateResults: () => { totalReach: number; reachablePersons: number };
}

export const useCalculatorStore = create<CalculatorStore>((set, get) => ({
  selectedRegion: 'vorarlberg',
  requirements: {
    distance: 30,
    segment: 'four_star',
    ageGroup: '25_35',
    demographic: 'gender_male',
  },
  marketing: {
    reach: 50,
    duration: 30,
  },
  powerUps: {
    referral: false,
    signing: false,
    relocation: false,
    childcare: false,
    housing: false,
  },
  campaignFactors: {
    wechselgruende: [],
    anreize: [],
    hinderungsgruende: [],
    loesungsansaetze: [],
  },
  updateState: (newState) => set((state) => ({ ...state, ...newState })),
  calculateResults: () => {
    const state = get();
    const basePopulation = REGIONS[state.selectedRegion].population;

    // Calculate all factors
    const distanceFactor = calculateDistanceFactor(state.requirements.distance);
    const segmentFactor = SEGMENTS[state.requirements.segment].factor;
    const powerUpsFactor = calculatePowerUpsFactor(state.powerUps);
    const marketingFactor = state.marketing.reach / 100;
    const durationFactor = calculateDurationFactor(state.marketing.duration);
    
    // Calculate campaign multiplier
    const campaignMultiplier = calculateCampaignMultiplier(
      state.campaignFactors.wechselgruende,
      state.campaignFactors.anreize,
      state.campaignFactors.hinderungsgruende,
      state.campaignFactors.loesungsansaetze
    );

    // Final calculation
    const reach = Math.round(
      basePopulation *
      distanceFactor *
      segmentFactor *
      powerUpsFactor *
      marketingFactor *
      durationFactor *
      campaignMultiplier
    );

    return {
      totalReach: reach,
      reachablePersons: Math.round(reach * 10),
    };
  },
}));
EOL

echo -e "\n${BLUE}Store implementation completed!${NC}"
echo -e "${GREEN}✓${NC} Campaign factors created"
echo -e "${GREEN}✓${NC} Calculation utils implemented"
echo -e "${GREEN}✓${NC} Store implemented"

echo -e "\n${BLUE}Next steps:${NC}"
echo "1. Run tests"
echo "2. Check implementation"
echo "3. Verify calculations"