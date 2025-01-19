import { Region, Segment } from './constants';

export interface Requirements {
  distance: number;
  segment: Segment;
  ageGroup: string;
  demographic: string;
}

export interface Marketing {
  reach: number;
  duration: number;
}

export interface PowerUps {
  referral: boolean;
  signing: boolean;
  relocation: boolean;
  childcare: boolean;
  housing: boolean;
}

export interface CampaignFactors {
  wechselgruende: string[];
  anreize: string[];
  hinderungsgruende: string[];
  loesungsansaetze: string[];
}

export interface CalculatorState {
  selectedRegion: Region;
  requirements: Requirements;
  marketing: Marketing;
  powerUps: PowerUps;
  campaignFactors: CampaignFactors;
}
