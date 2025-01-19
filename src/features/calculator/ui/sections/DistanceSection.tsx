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
