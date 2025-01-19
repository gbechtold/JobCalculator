'use client';

import { useCalculatorStore } from '../../model/store';
import { Switch } from "@/components/ui/switch";
import { ANREIZE } from '../../constants/campaignFactors';

export const AnreizeSection = () => {
  const { campaignFactors, updateState } = useCalculatorStore();

  const handleChange = (id: string, checked: boolean) => {
    updateState({
      campaignFactors: {
        ...campaignFactors,
        anreize: checked
          ? [...campaignFactors.anreize, id]
          : campaignFactors.anreize.filter(aId => aId !== id)
      }
    });
  };

  return (
    <div className="space-y-4 mb-8 bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
      <label className="block text-sm font-medium">Erforderliche Anreize (+)</label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ANREIZE.map((anreiz) => (
          <div key={anreiz.id} className="flex items-center space-x-2">
            <Switch
              checked={campaignFactors.anreize.includes(anreiz.id)}
              onCheckedChange={(checked) => handleChange(anreiz.id, checked)}
            />
            <span>{anreiz.label} (+{anreiz.boost}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
};
