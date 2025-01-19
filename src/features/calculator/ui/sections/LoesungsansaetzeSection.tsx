'use client';

import { useCalculatorStore } from '../../model/store';
import { Switch } from "@/components/ui/switch";
import { LOESUNGSANSAETZE } from '../../constants/campaignFactors';

export const LoesungsansaetzeSection = () => {
  const { campaignFactors, updateState } = useCalculatorStore();

  const handleChange = (id: string, checked: boolean) => {
    updateState({
      campaignFactors: {
        ...campaignFactors,
        loesungsansaetze: checked
          ? [...campaignFactors.loesungsansaetze, id]
          : campaignFactors.loesungsansaetze.filter(lId => lId !== id)
      }
    });
  };

  return (
    <div className="space-y-4 mb-8 bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
      <label className="block text-sm font-medium">Lösungsansätze (+)</label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {LOESUNGSANSAETZE.map((loesung) => (
          <div key={loesung.id} className="flex items-center space-x-2">
            <Switch
              checked={campaignFactors.loesungsansaetze.includes(loesung.id)}
              onCheckedChange={(checked) => handleChange(loesung.id, checked)}
            />
            <span>{loesung.label} (+{loesung.boost}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
};
