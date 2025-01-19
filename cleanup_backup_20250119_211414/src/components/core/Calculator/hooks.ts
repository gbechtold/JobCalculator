import { useEffect, useState } from 'react';
import { useCalculatorContext } from './context';

export function useCalculatorResults() {
  const { state } = useCalculatorContext();
  const [results, setResults] = useState({ totalReach: 0, reachablePersons: 0 });

  useEffect(() => {
    const basePopulation = {
      vorarlberg: 2500,
      tirol: 4500,
      salzburg: 3800,
      kaernten: 3200,
      steiermark: 4800,
      oberoesterreich: 5200,
      niederoesterreich: 5800,
      wien: 7500,
      burgenland: 2200,
    }[state.selectedRegion] || 0;

    // Calculation logic here
    const reach = basePopulation; // Simplified for example

    setResults({
      totalReach: Math.round(reach),
      reachablePersons: Math.round(reach * 10),
    });
  }, [state]);

  return results;
}
