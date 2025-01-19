'use client';

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {useCalculatorStore} from '@/store/calculatorStore';
import {REGIONS} from '@/lib/constants';

export const RegionSelect = () => {
  const {selectedRegion, updateState} = useCalculatorStore();

  return (
    <div className="space-y-4 mb-6">
      <label className="block text-sm font-medium">Region</label>
      <Select value={selectedRegion} onValueChange={(value) => updateState({selectedRegion: value})}>
        <SelectTrigger className="w-full border-2 border-slate-200 dark:border-slate-700">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(REGIONS).map(([key, {name, population}]) => (
            <SelectItem key={key} value={key}>
              {name} ({population.toLocaleString()} Fachkräfte)
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
