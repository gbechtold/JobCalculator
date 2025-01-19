'use client';

import { useCalculatorStore } from '../../model/store';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const AgeGroupSection = () => {
  const { requirements, updateState } = useCalculatorStore();

  return (
    <div className="space-y-4 mb-6">
      <label className="block text-sm font-medium">Altersgruppe</label>
      <Select
        value={requirements.ageGroup}
        onValueChange={(value) => updateState({ requirements: { ...requirements, ageGroup: value } })}
      >
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Alle Altersgruppen (100%)</SelectItem>
          <SelectItem value="under_25">Unter 25 Jahre (20%)</SelectItem>
          <SelectItem value="25_35">25-35 Jahre (35%)</SelectItem>
          <SelectItem value="36_45">36-45 Jahre (25%)</SelectItem>
          <SelectItem value="46_55">46-55 Jahre (15%)</SelectItem>
          <SelectItem value="over_55">Über 55 Jahre (5%)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
