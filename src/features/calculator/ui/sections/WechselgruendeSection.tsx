'use client';

import { useCalculatorStore } from '../../model/store';
import { Switch } from "@/components/ui/switch";
import { WECHSELGRUENDE } from '../../constants/campaignFactors';

export const WechselgruendeSection = () => {
  const { campaignFactors, updateState } = useCalculatorStore();

  const handleChange = (id: string, checked: boolean) => {
    updateState({
      campaignFactors: {
        ...campaignFactors,
        wechselgruende: checked
          ? [...campaignFactors.wechselgruende, id]
          : campaignFactors.wechselgruende.filter(wId => wId !== id)
      }
    });
  };

  return (
    <div className="space-y-4 mb-8 bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
      <label className="block text-sm font-medium">Mögliche Wechselgründe zukünftiger Mitarbeiter (+)</label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {WECHSELGRUENDE.map((grund) => (
          <div key={grund.id} className="flex items-center space-x-2">
            <Switch
              checked={campaignFactors.wechselgruende.includes(grund.id)}
              onCheckedChange={(checked) => handleChange(grund.id, checked)}
            />
            <span>{grund.label} (+{grund.boost}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
};
