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
