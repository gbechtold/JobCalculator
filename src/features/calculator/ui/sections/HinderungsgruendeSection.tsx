'use client';

import { useCalculatorStore } from '../../model/store';
import { Switch } from "@/components/ui/switch";
import { HINDERUNGSGRUENDE } from '../../constants/campaignFactors';

export const HinderungsgruendeSection = () => {
  const { campaignFactors, updateState } = useCalculatorStore();

  const handleChange = (id: string, checked: boolean) => {
    updateState({
      campaignFactors: {
        ...campaignFactors,
        hinderungsgruende: checked
          ? [...campaignFactors.hinderungsgruende, id]
          : campaignFactors.hinderungsgruende.filter(hId => hId !== id)
      }
    });
  };

  return (
    <div className="space-y-4 mb-8 bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
      <label className="block text-sm font-medium">Hinderungsgründe (-)</label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {HINDERUNGSGRUENDE.map((grund) => (
          <div key={grund.id} className="flex items-center space-x-2">
            <Switch
              checked={campaignFactors.hinderungsgruende.includes(grund.id)}
              onCheckedChange={(checked) => handleChange(grund.id, checked)}
            />
            <span>{grund.label} (-{grund.reduction}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
};
