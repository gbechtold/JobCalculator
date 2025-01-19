'use client';

import { useCalculatorStore } from '../../model/store';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const DemographicsSection = () => {
  const { requirements, updateState } = useCalculatorStore();

  return (
    <div className="space-y-4 mb-6">
      <label className="block text-sm font-medium">Demographische Merkmale</label>
      <Select
        value={requirements.demographic}
        onValueChange={(value) => updateState({ requirements: { ...requirements, demographic: value } })}
      >
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Alle Demographien (100%)</SelectItem>
          <SelectItem value="gender_male">Männlich (45%)</SelectItem>
          <SelectItem value="gender_female">Weiblich (55%)</SelectItem>
          <SelectItem value="migration_yes">Mit Migrationshintergrund (40%)</SelectItem>
          <SelectItem value="migration_no">Ohne Migrationshintergrund (60%)</SelectItem>
          <SelectItem value="education_professional">Mit Berufsausbildung (60%)</SelectItem>
          <SelectItem value="education_trained">Angelernt (30%)</SelectItem>
          <SelectItem value="education_higher">Höhere Ausbildung (10%)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
