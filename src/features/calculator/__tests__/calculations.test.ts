import {
  calculateDistanceFactor,
  calculatePowerUpsFactor,
  calculateDurationFactor,
  calculateCampaignMultiplier
} from '../utils/calculations';

describe('Calculator Utilities', () => {
  describe('calculateDistanceFactor', () => {
    it('should return minimum factor for 0km', () => {
      expect(calculateDistanceFactor(0)).toBe(0.01);
    });

    it('should return maximum factor for 100km', () => {
      expect(calculateDistanceFactor(100)).toBe(1);
    });

    it('should calculate correct factor for 50km', () => {
      expect(calculateDistanceFactor(50)).toBe(0.505);
    });
  });

  describe('calculatePowerUpsFactor', () => {
    it('should return base factor with no powerups', () => {
      const powerUps = {
        referral: false,
        signing: false,
        relocation: false,
        childcare: false,
        housing: false
      };
      expect(calculatePowerUpsFactor(powerUps)).toBe(1);
    });

    it('should return correct factor with some powerups', () => {
      const powerUps = {
        referral: true,
        signing: true,
        relocation: false,
        childcare: false,
        housing: false
      };
      expect(calculatePowerUpsFactor(powerUps)).toBe(1.4);
    });
  });

  describe('calculateDurationFactor', () => {
    it('should return minimum factor for 7 days', () => {
      expect(calculateDurationFactor(7)).toBeCloseTo(0.0194, 4);
    });

    it('should return maximum factor for 365 days', () => {
      expect(calculateDurationFactor(365)).toBe(1);
    });
  });

  describe('calculateCampaignMultiplier', () => {
    it('should return base multiplier with no factors', () => {
      expect(calculateCampaignMultiplier([], [], [], [])).toBe(1);
    });

    it('should calculate correct multiplier with all factors', () => {
      const wechselgruende = ['work_life', 'gehalt'];
      const anreize = ['flexibel', 'gehalt_plus'];
      const hinderungsgruende = ['standort'];
      const loesungsansaetze = ['einstieg', 'mobilitaet'];

      const result = calculateCampaignMultiplier(
        wechselgruende,
        anreize,
        hinderungsgruende,
        loesungsansaetze
      );

      expect(result).toBeGreaterThan(1);
    });
  });
});
