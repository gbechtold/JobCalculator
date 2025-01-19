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
