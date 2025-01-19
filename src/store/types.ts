export interface CalculatorState {
  selectedRegion: string;
  requirements: {
    distance: number;
    segment: string;
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
    wechselgruende: string[];
    anreize: string[];
    hinderungsgruende: string[];
    loesungsansaetze: string[];
  };
}
