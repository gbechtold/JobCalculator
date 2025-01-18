import { createContext, useContext, useState, PropsWithChildren } from 'react';
import { CalculatorState } from './types';

const CalculatorContext = createContext<{
  state: CalculatorState;
  updateState: (newState: Partial<CalculatorState>) => void;
} | undefined>(undefined);

export function CalculatorProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<CalculatorState>({
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

  const updateState = (newState: Partial<CalculatorState>) => {
    setState(prev => ({ ...prev, ...newState }));
  };

  return (
    <CalculatorContext.Provider value={{ state, updateState }}>
      {children}
    </CalculatorContext.Provider>
  );
}

export const useCalculatorContext = () => {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error('useCalculatorContext must be used within CalculatorProvider');
  }
  return context;
};
