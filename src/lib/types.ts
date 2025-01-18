export type Region = keyof typeof import('./constants').REGIONS;
export type Segment = keyof typeof import('./constants').SEGMENTS;

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
