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
