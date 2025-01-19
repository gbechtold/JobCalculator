// src/features/calculat@/store/calculatorStore.ts
import {create} from 'zustand';
import {CalculatorState} from './types';
import {REGIONS, SEGMENTS} from '@/lib/constants';

interface CalculatorStore extends CalculatorState {
  updateState: (newState: Partial<CalculatorState>) => void;
  calculateResults: () => {totalReach: number; reachablePersons: number};
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
  updateState: (newState) => set((state) => ({...state, ...newState})),
  calculateResults: () => {
    const state = get();
    const basePopulation = REGIONS[state.selectedRegion as keyof typeof REGIONS].population;

    // Calculation factors
    const distanceFactor = 0.01 + 0.99 * (state.requirements.distance / 100);
    const segmentFactor = SEGMENTS[state.requirements.segment as keyof typeof SEGMENTS].factor;

    // Age factors
    const ageFactors = {
      all: 1.0,
      under_25: 0.2,
      '25_35': 0.35,
      '36_45': 0.25,
      '46_55': 0.15,
      over_55: 0.05,
    };
    const ageFactor = ageFactors[state.requirements.ageGroup as keyof typeof ageFactors];

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
    const demoFactor = demoFactors[state.requirements.demographic as keyof typeof demoFactors];

    // Power-ups calculation
    const powerUpCount = Object.values(state.powerUps).filter(Boolean).length;
    const powerUpsFactor = powerUpCount * 0.2 + 1;

    // Marketing factors
    const marketingFactor = state.marketing.reach / 100;
    const durationFactor = Math.min(state.marketing.duration / 30, 12) / 12;

    // Campaign factors calculation
    const wechselgruendeBoost = state.campaignFactors.wechselgruende.length * 0.2;
    const anreizeBoost = state.campaignFactors.anreize.length * 0.25;
    const hinderungsReduction = state.campaignFactors.hinderungsgruende.length * -0.2;
    const loesungsBoost = state.campaignFactors.loesungsansaetze.length * 0.25;
    const campaignMultiplier = 1 + wechselgruendeBoost + anreizeBoost + Math.abs(hinderungsReduction) + loesungsBoost;

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
