#!/bin/bash

# Create sections directory if it doesn't exist
mkdir -p src/features/calculator/ui/sections

# Create components for each section
echo "Creating section components..."

# HotelSegmentSection
cat > src/features/calculator/ui/sections/HotelSegmentSection.tsx << 'EOL'
'use client';

import { useCalculatorStore } from '../../model/store';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
EOL

# AgeGroupSection
cat > src/features/calculator/ui/sections/AgeGroupSection.tsx << 'EOL'
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
EOL

# DemographicsSection
cat > src/features/calculator/ui/sections/DemographicsSection.tsx << 'EOL'
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
EOL

# DistanceSection
cat > src/features/calculator/ui/sections/DistanceSection.tsx << 'EOL'
'use client';

import { useCalculatorStore } from '../../model/store';
import { Slider } from "@/components/ui/slider";

export const DistanceSection = () => {
  const { requirements, updateState } = useCalculatorStore();

  return (
    <div className="space-y-4 mb-6">
      <label className="block text-sm font-medium">
        Maximale Distanz: {requirements.distance}km
      </label>
      <Slider
        value={[requirements.distance]}
        onValueChange={([value]) => 
          updateState({ requirements: { ...requirements, distance: value } })}
        max={100}
        step={5}
        className="w-full"
      />
    </div>
  );
};
EOL

# PowerUpsSection (already exists, just ensure it's properly updated)
cat > src/features/calculator/ui/sections/PowerUpsSection.tsx << 'EOL'
'use client';

import { useCalculatorStore } from '../../model/store';
import { Switch } from "@/components/ui/switch";

export const PowerUpsSection = () => {
  const { powerUps, updateState } = useCalculatorStore();

  const handlePowerUpChange = (key: keyof typeof powerUps, checked: boolean) => {
    updateState({
      powerUps: {
        ...powerUps,
        [key]: checked
      }
    });
  };

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">2. Zusatzleistungen</h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries({
          referral: "Mitarbeiterempfehlung 👥",
          signing: "Startbonus 💰",
          relocation: "Umzugshilfe 🏠",
          childcare: "Kinderbetreuung 👶",
          housing: "Personalwohnung 🏘️"
        }).map(([key, label]) => (
          <div key={key} className="flex items-center space-x-2">
            <Switch
              checked={powerUps[key as keyof typeof powerUps]}
              onCheckedChange={(checked) => handlePowerUpChange(key as keyof typeof powerUps, checked)}
            />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
EOL

# MarketingCampaignSection
cat > src/features/calculator/ui/sections/MarketingCampaignSection.tsx << 'EOL'
'use client';

import { useCalculatorStore } from '../../model/store';
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

export const MarketingCampaignSection = () => {
  const { marketing, campaignFactors, updateState } = useCalculatorStore();

  return (
    <section className="border-t pt-8">
      <h2 className="text-xl font-bold mb-4">3. Recruiting Kampagne</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <label className="block text-sm font-medium">
            Marketing-Reichweite: {marketing.reach}%
          </label>
          <Slider
            value={[marketing.reach]}
            onValueChange={([value]) => 
              updateState({ marketing: { ...marketing, reach: value } })}
            max={100}
            step={5}
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium">
            Kampagnen-Dauer: {marketing.duration} Tage
          </label>
          <Slider
            value={[marketing.duration]}
            onValueChange={([value]) => 
              updateState({ marketing: { ...marketing, duration: value } })}
            min={7}
            max={365}
            step={7}
          />
        </div>
      </div>

      {/* Campaign Factors sections will be implemented here */}
    </section>
  );
};
EOL

# Update the main Calculator.tsx to use the new sections
cat > src/features/calculator/ui/Calculator.tsx << 'EOL'
'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { RegionSection } from './sections/RegionSection';
import { HotelSegmentSection } from './sections/HotelSegmentSection';
import { AgeGroupSection } from './sections/AgeGroupSection';
import { DemographicsSection } from './sections/DemographicsSection';
import { DistanceSection } from './sections/DistanceSection';
import { PowerUpsSection } from './sections/PowerUpsSection';
import { MarketingCampaignSection } from './sections/MarketingCampaignSection';
import { ResultsSection } from './sections/ResultsSection';

export const Calculator = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card className="shadow-lg border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle>Stellenreichweiten-Kalkulator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold mb-4">1. Zielgruppen-Definition</h2>
              <RegionSection />
              <HotelSegmentSection />
              <AgeGroupSection />
              <DemographicsSection />
              <DistanceSection />
            </section>
            
            <PowerUpsSection />
            <MarketingCampaignSection />
            <ResultsSection />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Calculator;
EOL

# Update the index.ts to export all sections
cat > src/features/calculator/ui/sections/index.ts << 'EOL'
export { RegionSection } from './RegionSection';
export { HotelSegmentSection } from './HotelSegmentSection';
export { AgeGroupSection } from './AgeGroupSection';
export { DemographicsSection } from './DemographicsSection';
export { DistanceSection } from './DistanceSection';
export { PowerUpsSection } from './PowerUpsSection';
export { MarketingCampaignSection } from './MarketingCampaignSection';
export { ResultsSection } from './ResultsSection';
EOL

echo "Component structure update completed!"
echo "Next steps:"
echo "1. Review and test each component"
echo "2. Implement remaining campaign factors in MarketingCampaignSection"
echo "3. Add any missing TypeScript types"
echo "4. Update styling as needed"
