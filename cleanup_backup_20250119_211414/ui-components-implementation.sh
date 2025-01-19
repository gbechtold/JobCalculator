#!/bin/bash

# Fortsetzung des HinderungsgruendeSection.tsx
cat > $UI_DIR/HinderungsgruendeSection.tsx << 'EOL'
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
EOL

# LoesungsansaetzeSection
echo -e "${GREEN}Creating LoesungsansaetzeSection...${NC}"
cat > $UI_DIR/LoesungsansaetzeSection.tsx << 'EOL'
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
EOL

# 8. Update Calculator.tsx
echo -e "${GREEN}Updating main Calculator component...${NC}"
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

# 9. Export all sections
echo -e "${GREEN}Creating sections index file...${NC}"
cat > $UI_DIR/index.ts << 'EOL'
export * from './RegionSection';
export * from './HotelSegmentSection';
export * from './AgeGroupSection';
export * from './DemographicsSection';
export * from './DistanceSection';
export * from './PowerUpsSection';
export * from './MarketingCampaignSection';
export * from './ResultsSection';
export * from './WechselgruendeSection';
export * from './AnreizeSection';
export * from './HinderungsgruendeSection';
export * from './LoesungsansaetzeSection';
EOL

echo -e "${BLUE}UI components implementation completed!${NC}"
echo -e "${GREEN}✓${NC} All sections created"
echo -e "${GREEN}✓${NC} Calculator component updated"
echo -e "${GREEN}✓${NC} Section exports configured"

echo -e "\n${BLUE}Next steps:${NC}"
echo "1. Review the implemented components"
echo "2. Test the UI interactions"
echo "3. Verify the styling"
echo "4. Check dark mode compatibility"
