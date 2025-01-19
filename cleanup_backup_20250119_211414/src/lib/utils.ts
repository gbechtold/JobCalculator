import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateReach(params: {
  basePopulation: number;
  distance: number;
  segmentFactor: number;
  ageFactor: number;
  demoFactor: number;
  powerUpCount: number;
  marketingReach: number;
  campaignDuration: number;
}) {
  const {
    basePopulation,
    distance,
    segmentFactor,
    ageFactor,
    demoFactor,
    powerUpCount,
    marketingReach,
    campaignDuration,
  } = params;

  const distanceFactor = 0.01 + 0.99 * (distance / 100);
  const powerUpsFactor = powerUpCount * 0.2 + 1;
  const marketingFactor = marketingReach / 100;
  const durationFactor = Math.min(campaignDuration / 30, 12) / 12;

  return (
    basePopulation *
    distanceFactor *
    segmentFactor *
    ageFactor *
    demoFactor *
    powerUpsFactor *
    marketingFactor *
    durationFactor
  );
}
