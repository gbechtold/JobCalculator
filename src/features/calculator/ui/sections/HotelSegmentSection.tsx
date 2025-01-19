'use client';

import { useCalculatorStore } from '../../model/store';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SEGMENTS } from '@/lib/constants';

export const HotelSegmentSection = () => {
  const { requirements, updateState } = useCalculatorStore();

  return (
    <div className="space-y-4 mb-6">
      <label className="block text-sm font-medium">Hotelsegment</label>
      <Select 
        value={requirements.segment}
        onValueChange={(value) => updateState({ requirements: { ...requirements, segment: value } })}
      >
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(SEGMENTS).map(([key, { label, factor }]) => (
            <SelectItem key={key} value={key}>
              {label} ({Math.round(factor * 100)}%)
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
