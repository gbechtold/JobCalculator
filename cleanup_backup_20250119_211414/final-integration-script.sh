#!/bin/bash

echo "Starting final integration..."

# Update store with full calculation logic
cat > src/features/calculator/model/store.ts << 'EOL'
import { create } from 'zustand';
import { CalculatorState } from '../types';
import { REGIONS, SEGMENTS } from '@/lib/constants';
import {
  WECHSELGRUENDE,
  ANREIZE,
  HINDERUNGSGRUENDE,
  LOESUNGSANSAETZE
} from '../constants/campaignFactors';

interface CalculatorStore extends CalculatorState {
  updateState: (newState: Partial<CalculatorState>) => void;
  calculateResults: () => { totalReach: number; reachablePersons: number };
}

export const useCalculatorStore = create<CalculatorStore>((set, get) => ({
  selectedRegion: 'vorarlberg',
  requirements: {
    distance: 30,
    segment: 'four_star',
    ageGroup: '25_35',
    demographic: 'gender_male',
  },
  marketing: {
    reach: 50,
    duration: 30,
  },
  powerUps: {
    referral: false,
    signing: false,
    relocation: false,
    childcare: false,
    housing: false,
  },
  campaignFactors: {
    wechselgruende: [],
    anreize: [],
    hinderungsgruende: [],
    loesungsansaetze: [],
  },
  updateState: (newState) => set((state) => ({ ...state, ...newState })),
  calculateResults: () => {
    const state = get();
    const basePopulation = REGIONS[state.selectedRegion as keyof typeof REGIONS].population;

    // Distance factor (1% at 0km to 100% at 100km)
    const distanceFactor = 0.01 + 0.99 * (state.requirements.distance / 100);

    // Segment factor
    const segmentFactor = SEGMENTS[state.requirements.segment as keyof typeof SEGMENTS].factor;

    // Age factors
    const ageFactors = {
      all: 1.0,
      under_25: 0.2,
      '25_35': 0.35,
      '36_45': 0.25,
      '46_55': 0.15,
      over_55: 0.05,
    };
    const ageFactor = ageFactors[state.requirements.ageGroup as keyof typeof ageFactors];

    // Demographic factors
    const demoFactors = {
      all: 1.0,
      gender_male: 0.45,
      gender_female: 0.55,
      migration_yes: 0.4,
      migration_no: 0.6,
      education_professional: 0.6,
      education_trained: 0.3,
      education_higher: 0.1,
    };
    const demoFactor = demoFactors[state.requirements.demographic as keyof typeof demoFactors];

    // Power-ups calculation
    const powerUpCount = Object.values(state.powerUps).filter(Boolean).length;
    const powerUpsFactor = powerUpCount * 0.2 + 1;

    // Marketing factors
    const marketingFactor = state.marketing.reach / 100;
    const durationFactor = Math.min(state.marketing.duration / 30, 12) / 12;

    // Campaign factors calculation
    const wechselgruendeBoost = state.campaignFactors.wechselgruende.reduce((acc, id) => {
      const factor = WECHSELGRUENDE.find(w => w.id === id)?.boost || 0;
      return acc + (factor / 100);
    }, 0);

    const anreizeBoost = state.campaignFactors.anreize.reduce((acc, id) => {
      const factor = ANREIZE.find(a => a.id === id)?.boost || 0;
      return acc + (factor / 100);
    }, 0);

    const hinderungsReduction = state.campaignFactors.hinderungsgruende.reduce((acc, id) => {
      const factor = HINDERUNGSGRUENDE.find(h => h.id === id)?.reduction || 0;
      return acc + (factor / 100);
    }, 0);

    const loesungsBoost = state.campaignFactors.loesungsansaetze.reduce((acc, id) => {
      const factor = LOESUNGSANSAETZE.find(l => l.id === id)?.boost || 0;
      return acc + (factor / 100);
    }, 0);

    const campaignMultiplier = 1 + wechselgruendeBoost + anreizeBoost - hinderungsReduction + loesungsBoost;

    // Final calculation
    const reach =
      basePopulation *
      distanceFactor *
      segmentFactor *
      ageFactor *
      demoFactor *
      powerUpsFactor *
      marketingFactor *
      durationFactor *
      campaignMultiplier;

    return {
      totalReach: Math.round(reach),
      reachablePersons: Math.round(reach * 10),
    };
  },
}));
EOL

# Update ResultsSection with proper styling
cat > src/features/calculator/ui/sections/ResultsSection.tsx << 'EOL'
'use client';

import { useCalculatorStore } from '../../model/store';
import { REGIONS } from '@/lib/constants';

export const ResultsSection = () => {
  const { selectedRegion, calculateResults } = useCalculatorStore();
  const { totalReach, reachablePersons } = calculateResults();

  return (
    <section className="border-t pt-8">
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-bold mb-6">Kampagnen-Ergebnis</h2>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Potenzielle Kandidaten
            </div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {reachablePersons.toLocaleString()}
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Basis: {REGIONS[selectedRegion as keyof typeof REGIONS].name}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Gesamtreichweite
            </div>
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              {totalReach}%
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              inkl. aller Faktoren
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
EOL

# Update ClientWrapper with proper error handling
cat > src/components/ClientWrapper.tsx << 'EOL'
'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Provider } from '@/store/Provider';

const Calculator = dynamic(
  () => import('@/features/calculator/ui/Calculator').then(mod => mod.Calculator),
  {
    ssr: false,
    loading: () => (
      <div className="w-full max-w-4xl mx-auto p-4">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    ),
  }
);

export default function ClientWrapper() {
  return (
    <Provider>
      <div className="w-full" suppressHydrationWarning>
        <Suspense fallback={
          <div className="w-full h-screen flex items-center justify-center">
            <div className="text-slate-600 dark:text-slate-400">Loading...</div>
          </div>
        }>
          <Calculator />
        </Suspense>
      </div>
    </Provider>
  );
}
EOL

# Update constants with proper typing
cat > src/lib/constants.ts << 'EOL'
export const REGIONS = {
  vorarlberg: { name: 'Vorarlberg', population: 2500 },
  tirol: { name: 'Tirol', population: 4500 },
  salzburg: { name: 'Salzburg', population: 3800 },
  kaernten: { name: 'Kärnten', population: 3200 },
  steiermark: { name: 'Steiermark', population: 4800 },
  oberoesterreich: { name: 'Oberösterreich', population: 5200 },
  niederoesterreich: { name: 'Niederösterreich', population: 5800 },
  wien: { name: 'Wien', population: 7500 },
  burgenland: { name: 'Burgenland', population: 2200 },
} as const;

export const SEGMENTS = {
  all: { label: 'Alle Segmente', factor: 1.0 },
  five_star: { label: '5-Sterne-Hotels', factor: 0.05 },
  four_star: { label: '4-Sterne-Hotels', factor: 0.35 },
  three_star: { label: '3-Sterne-Hotels', factor: 0.4 },
  two_star: { label: '2-Sterne und Pensionen', factor: 0.15 },
  apartments: { label: 'Ferienwohnungen', factor: 0.05 },
} as const;

export type Region = keyof typeof REGIONS;
export type Segment = keyof typeof SEGMENTS;
EOL

# Update types with proper utility types
cat > src/lib/types.ts << 'EOL'
import { Region, Segment } from './constants';

export interface Requirements {
  distance: number;
  segment: Segment;
  ageGroup: string;
  demographic: string;
}

export interface Marketing {
  reach: number;
  duration: number;
}

export interface PowerUps {
  referral: boolean;
  signing: boolean;
  relocation: boolean;
  childcare: boolean;
  housing: boolean;
}

export interface CampaignFactors {
  wechselgruende: string[];
  anreize: string[];
  hinderungsgruende: string[];
  loesungsansaetze: string[];
}

export interface CalculatorState {
  selectedRegion: Region;
  requirements: Requirements;
  marketing: Marketing;
  powerUps: PowerUps;
  campaignFactors: CampaignFactors;
}
EOL

# Update tailwind.config.ts with proper dark mode support
cat > tailwind.config.ts << 'EOL'
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
} satisfies Config;
EOL

# Update globals.css with proper CSS variables
cat > src/app/globals.css << 'EOL'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 48%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}
EOL

echo "Final integration completed!"
echo "Next steps:"
echo "1. Test dark mode functionality"
echo "2. Verify all calculations"
echo "3. Check responsive design"
echo "4. Test hydration and client-side functionality"