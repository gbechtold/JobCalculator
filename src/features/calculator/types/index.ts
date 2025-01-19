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
