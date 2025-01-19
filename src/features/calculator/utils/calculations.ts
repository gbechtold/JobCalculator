export const calculateDistanceFactor = (distance: number): number => {
  return 0.01 + 0.99 * (distance / 100);
};

export const calculatePowerUpsFactor = (powerUps: Record<string, boolean>): number => {
  const activeCount = Object.values(powerUps).filter(Boolean).length;
  return 1 + (activeCount * 0.2);
};

export const calculateDurationFactor = (days: number): number => {
  return Math.min(days / 30, 12) / 12;
};

export const calculateCampaignMultiplier = (
  wechselgruende: string[],
  anreize: string[],
  hinderungsgruende: string[],
  loesungsansaetze: string[]
): number => {
  const wechselgruendeBoost = wechselgruende.length * 0.2;
  const anreizeBoost = anreize.length * 0.25;
  const hinderungsReduction = hinderungsgruende.length * 0.2;
  const loesungsBoost = loesungsansaetze.length * 0.25;

  return 1 + wechselgruendeBoost + anreizeBoost - hinderungsReduction + loesungsBoost;
};
