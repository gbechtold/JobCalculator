#!/bin/bash

# Farben für Output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}Starting store implementation...${NC}"

# 1. Campaign Factors Constants erstellen
echo -e "${GREEN}Creating campaign factors constants...${NC}"
cat > src/features/calculator/constants/campaignFactors.ts << 'EOL'
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

# 2. Calculator Types aktualisieren
echo -e "${GREEN}Updating calculator types...${NC}"
cat > src/features/calculator/types/index.ts << 'EOL'
import { Region, Segment } from '@/lib/constants';
import { 
  WechselgruendeId, 
  AnreizeId, 
  HinderungsgruendeId, 
  LoesungsansaetzeId 
} from '../constants/campaignFactors';

export interface CalculatorState {
  selectedRegion: Region;
  requirements: {
    distance: number;
    segment: Segment;
    ageGroup: string;
    demographic: string;
  };
  marketing: {
    reach: number;
    duration: number;
  };
  powerUps: {
    referral: boolean;
    signing: boolean;
    relocation: boolean;
    childcare: boolean;
    housing: boolean;
  };
  campaignFactors: {
    wechselgruende: WechselgruendeId[];
    anreize: AnreizeId[];
    hinderungsgruende: HinderungsgruendeId[];
    loesungsansaetze: LoesungsansaetzeId[];
  };
}
EOL

# 3. Calculator Store erweitern
echo -e "${GREEN}Extending calculator store...${NC}"
cat > src/features/calculator/model/store.ts << 'EOL'
import { create } from 'zustand';
import { CalculatorState } from '../types';
import { REGIONS, SEGMENTS } from '@/lib/constants';
import {
  WECHSELGRUENDE,
  ANREIZE,
  HINDERUNGSGRUENDE,
  LOESUNGSANSAETZE
} from '../constants/campaignFactors';

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

    // Distance factor (1% at 0km to 100% at 100km)
    const distanceFactor = 0.01 + 0.99 * (state.requirements.distance / 100);

    // Segment factor
    const segmentFactor = SEGMENTS[state.requirements.segment].factor;

    // Age factors
    const ageFactors = {
      all: 1.0,
      under_25: 0.2,
      '25_35': 0.35,
      '36_45': 0.25,
      '46_55': 0.15,
      over_55: 0.05,
    };
    const ageFactor = ageFactors[state.requirements.ageGroup];

    // Demographic factors
    const demoFactors = {
      all: 1.0,
      gender_male: 0.45,
      gender_female: 0.55,
      migration_yes: 0.4,
      migration_no: 0.6,
      education_professional: 0.6,
      education_trained: 0.3,
      education_higher: 0.1,
    };
    const demoFactor = demoFactors[state.requirements.demographic];

    // Power-ups calculation
    const powerUpCount = Object.values(state.powerUps).filter(Boolean).length;
    const powerUpsFactor = powerUpCount * 0.2 + 1;

    // Marketing factors
    const marketingFactor = state.marketing.reach / 100;
    const durationFactor = Math.min(state.marketing.duration / 30, 12) / 12;

    // Campaign factors calculation
    const wechselgruendeBoost = state.campaignFactors.wechselgruende.reduce((acc, id) => {
      const factor = WECHSELGRUENDE.find(w => w.id === id)?.boost || 0;
      return acc + (factor / 100);
    }, 0);

    const anreizeBoost = state.campaignFactors.anreize.reduce((acc, id) => {
      const factor = ANREIZE.find(a => a.id === id)?.boost || 0;
      return acc + (factor / 100);
    }, 0);

    const hinderungsReduction = state.campaignFactors.hinderungsgruende.reduce((acc, id) => {
      const factor = HINDERUNGSGRUENDE.find(h => h.id === id)?.reduction || 0;
      return acc + (factor / 100);
    }, 0);

    const loesungsBoost = state.campaignFactors.loesungsansaetze.reduce((acc, id) => {
      const factor = LOESUNGSANSAETZE.find(l => l.id === id)?.boost || 0;
      return acc + (factor / 100);
    }, 0);

    const campaignMultiplier = 1 + wechselgruendeBoost + anreizeBoost - hinderungsReduction + loesungsBoost;

    // Final calculation
    const reach =
      basePopulation *
      distanceFactor *
      segmentFactor *
      ageFactor *
      demoFactor *
      powerUpsFactor *
      marketingFactor *
      durationFactor *
      campaignMultiplier;

    return {
      totalReach: Math.round(reach),
      reachablePersons: Math.round(reach * 10),
    };
  },
}));
EOL

# 4. Verzeichnisstruktur erstellen
echo -e "${GREEN}Creating directory structure...${NC}"
mkdir -p src/features/calculator/{constants,model,types,ui/sections} 2>/dev/null

# 5. Berechtigungen setzen
echo -e "${GREEN}Setting permissions...${NC}"
chmod +x store-implementation.sh

echo -e "${BLUE}Store implementation completed!${NC}"
echo -e "${GREEN}✓${NC} Campaign factors constants created"
echo -e "${GREEN}✓${NC} Calculator types updated"
echo -e "${GREEN}✓${NC} Calculator store extended"
echo -e "${GREEN}✓${NC} Directory structure verified"

echo -e "\n${BLUE}Next steps:${NC}"
echo "1. Review the implemented files"
echo "2. Run tests if available"
echo "3. Proceed with UI component implementation"
