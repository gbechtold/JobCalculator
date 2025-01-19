'use client';

import { useCalculatorStore } from '../../model/store';
import { Slider } from "@/components/ui/slider";
import { WechselgruendeSection } from './WechselgruendeSection';
import { AnreizeSection } from './AnreizeSection';
import { HinderungsgruendeSection } from './HinderungsgruendeSection';
import { LoesungsansaetzeSection } from './LoesungsansaetzeSection';

export const MarketingCampaignSection = () => {
  const { marketing, updateState } = useCalculatorStore();

  return (
    <section>
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
            className="w-full"
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
            className="w-full"
          />
        </div>
      </div>

      <WechselgruendeSection />
      <AnreizeSection />
      <HinderungsgruendeSection />
      <LoesungsansaetzeSection />
    </section>
  );
};
