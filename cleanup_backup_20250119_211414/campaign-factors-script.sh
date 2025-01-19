#!/bin/bash

# Create constants for campaign factors
echo "Creating campaign factors constants..."
mkdir -p src/features/calculator/constants

cat > src/features/calculator/constants/campaignFactors.ts << 'EOL'
export const WECHSELGRUENDE = [
  { id: 'work_life', label: 'Work-Life-Balance', boost: 20 },
  { id: 'gehalt', label: 'Gehaltsniveau', boost: 25 },
  { id: 'belastung', label: 'Körperliche Belastung', boost: 15 },
  { id: 'aufstieg', label: 'Aufstiegsmöglichkeiten', boost: 20 },
  { id: 'klima', label: 'Betriebsklima', boost: 15 },
  { id: 'sicherheit', label: 'Arbeitsplatzsicherheit', boost: 20 }
] as const;

export const ANREIZE = [
  { id: 'flexibel', label: 'Flexible Arbeitszeiten', boost: 25 },
  { id: 'gehalt_plus', label: 'Überdurchschnittliches Gehalt', boost: 30 },
  { id: 'gesundheit', label: 'Gesundheitsförderung', boost: 15 },
  { id: 'karriere', label: 'Karriereprogramm', boost: 20 },
  { id: 'teamevents', label: 'Regelmäßige Teamevents', boost: 10 },
  { id: 'weiterbildung', label: 'Weiterbildungsbudget', boost: 20 }
] as const;

export const HINDERUNGSGRUENDE = [
  { id: 'standort', label: 'Standort/Erreichbarkeit', reduction: 20 },
  { id: 'arbeitszeiten', label: 'Ungünstige Arbeitszeiten', reduction: 25 },
  { id: 'familie', label: 'Familiäre Gründe', reduction: 30 },
  { id: 'physisch', label: 'Körperliche Anforderungen', reduction: 20 },
  { id: 'qualifikation', label: 'Fehlende Qualifikation', reduction: 25 },
  { id: 'saison', label: 'Saisonale Unsicherheit', reduction: 25 }
] as const;

export const LOESUNGSANSAETZE = [
  { id: 'einstieg', label: 'Flexible Einstiegsmodelle', boost: 25 },
  { id: 'mobilitaet', label: 'Mobilitätsunterstützung', boost: 20 },
  { id: 'familienfreundlich', label: 'Familienfreundliche Organisation', boost: 30 },
  { id: 'qualifizierung', label: 'Qualifizierungsprogramme', boost: 25 },
  { id: 'balance', label: 'Work-Life-Balance Maßnahmen', boost: 25 },
  { id: 'integration', label: 'Soziale Integration', boost: 15 }
] as const;

export type WechselgruendeId = typeof WECHSELGRUENDE[number]['id'];
export type AnreizeId = typeof ANREIZE[number]['id'];
export type HinderungsgruendeId = typeof HINDERUNGSGRUENDE[number]['id'];
export type LoesungsansaetzeId = typeof LOESUNGSANSAETZE[number]['id'];
EOL

# Create campaign factor components
echo "Creating campaign factor components..."

# WechselgruendeSection
cat > src/features/calculator/ui/sections/WechselgruendeSection.tsx << 'EOL'
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
EOL

# AnreizeSection
cat > src/features/calculator/ui/sections/AnreizeSection.tsx << 'EOL'
'use client';

import { useCalculatorStore } from '../../model/store';
import { Switch } from "@/components/ui/switch";
import { ANREIZE } from '../../constants/campaignFactors';

export const AnreizeSection = () => {
  const { campaignFactors, updateState } = useCalculatorStore();

  const handleChange = (id: string, checked: boolean) => {
    updateState({
      campaignFactors: {
        ...campaignFactors,
        anreize: checked
          ? [...campaignFactors.anreize, id]
          : campaignFactors.anreize.filter(aId => aId !== id)
      }
    });
  };

  return (
    <div className="space-y-4 mb-8 bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
      <label className="block text-sm font-medium">Erforderliche Anreize (+)</label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ANREIZE.map((anreiz) => (
          <div key={anreiz.id} className="flex items-center space-x-2">
            <Switch
              checked={campaignFactors.anreize.includes(anreiz.id)}
              onCheckedChange={(checked) => handleChange(anreiz.id, checked)}
            />
            <span>{anreiz.label} (+{anreiz.boost}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
};
EOL

# HinderungsgruendeSection
cat > src/features/calculator/ui/sections/HinderungsgruendeSection.tsx << 'EOL'
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
cat > src/features/calculator/ui/sections/LoesungsansaetzeSection.tsx << 'EOL'
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

# Update MarketingCampaignSection to include the new sections
cat > src/features/calculator/ui/sections/MarketingCampaignSection.tsx << 'EOL'
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
EOL

# Update the types
cat > src/features/calculator/types/index.ts << 'EOL'
import { WechselgruendeId, AnreizeId, HinderungsgruendeId, LoesungsansaetzeId } from '../constants/campaignFactors';

export interface CalculatorState {
  selectedRegion: string;
  requirements: {
    distance: number;
    segment: string;
    ageGroup: string;
    demographic: string;
  };
  marketing: {
    reach: number;
    duration: number;
  };
  powerUps: {
    referral: boolean;
    signing: boolean;
    relocation: boolean;
    childcare: boolean;
    housing: boolean;
  };
  campaignFactors: {
    wechselgruende: WechselgruendeId[];
    anreize: AnreizeId[];
    hinderungsgruende: HinderungsgruendeId[];
    loesungsansaetze: LoesungsansaetzeId[];
  };
}
EOL

# Update sections index
echo "Updating sections index..."
cat > src/features/calculator/ui/sections/index.ts << 'EOL'
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

echo "Campaign factors implementation completed!"
echo "Next steps:"
echo "1. Review and test each component"
echo "2. Verify all type definitions"
echo "3. Test the calculation logic"
echo "4. Check dark mode styling"
