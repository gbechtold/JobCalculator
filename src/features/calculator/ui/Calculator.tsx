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
