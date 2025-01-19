#!/bin/bash

# Farben für Output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# Test Datei erstellen
echo -e "${BLUE}Creating test file...${NC}"
cat > src/features/calculator/__tests__/calculations.test.ts << 'EOL'
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
EOL

# Store Tests
echo -e "${BLUE}Creating store tests...${NC}"
cat > src/features/calculator/__tests__/store.test.ts << 'EOL'
import { renderHook, act } from '@testing-library/react';
import { useCalculatorStore } from '../model/store';

describe('Calculator Store', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useCalculatorStore());
    act(() => {
      result.current.updateState({
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
      });
    });
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useCalculatorStore());
    expect(result.current.selectedRegion).toBe('vorarlberg');
  });

  it('should update state correctly', () => {
    const { result } = renderHook(() => useCalculatorStore());
    act(() => {
      result.current.updateState({ selectedRegion: 'tirol' });
    });
    expect(result.current.selectedRegion).toBe('tirol');
  });

  it('should calculate results correctly', () => {
    const { result } = renderHook(() => useCalculatorStore());
    const results = result.current.calculateResults();
    expect(results.totalReach).toBeGreaterThan(0);
    expect(results.reachablePersons).toBeGreaterThan(0);
  });
});
EOL

echo -e "\n${BLUE}Test files created!${NC}"
echo -e "${GREEN}✓${NC} Calculation tests"
echo -e "${GREEN}✓${NC} Store tests"

echo -e "\n${BLUE}To run tests:${NC}"
echo "npm test"
echo "or"
echo "yarn test"