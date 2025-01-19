'use client';

import { useCalculatorStore } from '../../model/store';
import { REGIONS } from '@/lib/constants';

export const ResultsSection = () => {
  const { selectedRegion, calculateResults } = useCalculatorStore();
  const { totalReach, reachablePersons } = calculateResults();

  return (
    <section className="border-t pt-8">
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-bold mb-6">Kampagnen-Ergebnis</h2>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Potenzielle Kandidaten
            </div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {reachablePersons.toLocaleString()}
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Basis: {REGIONS[selectedRegion as keyof typeof REGIONS].name}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Gesamtreichweite
            </div>
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              {totalReach}%
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              inkl. aller Faktoren
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
