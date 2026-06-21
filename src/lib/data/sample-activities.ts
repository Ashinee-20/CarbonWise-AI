import type { DailyActivity } from "@/types/carbon";

export const sampleActivities: DailyActivity[] = [
  {
    date: "2026-06-08",
    transport: { mode: "car", distanceKm: 28 },
    food: { mealType: "meat", meals: 3 },
    electricity: { kwh: 18, renewablePercent: 15 },
    shopping: { type: "clothing", spendUsd: 55 }
  },
  {
    date: "2026-06-09",
    transport: { mode: "bus", distanceKm: 16 },
    food: { mealType: "mixed", meals: 3 },
    electricity: { kwh: 15, renewablePercent: 20 },
    shopping: { type: "services", spendUsd: 14 }
  },
  {
    date: "2026-06-10",
    transport: { mode: "car", distanceKm: 22 },
    food: { mealType: "dairy", meals: 3 },
    electricity: { kwh: 17, renewablePercent: 20 },
    shopping: { type: "home", spendUsd: 38 }
  },
  {
    date: "2026-06-11",
    transport: { mode: "train", distanceKm: 20 },
    food: { mealType: "mixed", meals: 3 },
    electricity: { kwh: 14, renewablePercent: 25 },
    shopping: { type: "services", spendUsd: 20 }
  },
  {
    date: "2026-06-12",
    transport: { mode: "car", distanceKm: 18 },
    food: { mealType: "meat", meals: 2 },
    electricity: { kwh: 16, renewablePercent: 25 },
    shopping: { type: "electronics", spendUsd: 80 }
  },
  {
    date: "2026-06-13",
    transport: { mode: "bike", distanceKm: 6 },
    food: { mealType: "plant", meals: 3 },
    electricity: { kwh: 12, renewablePercent: 35 },
    shopping: { type: "services", spendUsd: 10 }
  },
  {
    date: "2026-06-14",
    transport: { mode: "bus", distanceKm: 14 },
    food: { mealType: "mixed", meals: 3 },
    electricity: { kwh: 15, renewablePercent: 30 },
    shopping: { type: "home", spendUsd: 22 }
  },
  {
    date: "2026-06-15",
    transport: { mode: "train", distanceKm: 18 },
    food: { mealType: "mixed", meals: 3 },
    electricity: { kwh: 12, renewablePercent: 25 },
    shopping: { type: "services", spendUsd: 18 }
  },
  {
    date: "2026-06-16",
    transport: { mode: "car", distanceKm: 24 },
    food: { mealType: "meat", meals: 2 },
    electricity: { kwh: 16, renewablePercent: 20 },
    shopping: { type: "clothing", spendUsd: 45 }
  },
  {
    date: "2026-06-17",
    transport: { mode: "bike", distanceKm: 7 },
    food: { mealType: "plant", meals: 3 },
    electricity: { kwh: 10, renewablePercent: 40 },
    shopping: { type: "services", spendUsd: 12 }
  },
  {
    date: "2026-06-18",
    transport: { mode: "bus", distanceKm: 15 },
    food: { mealType: "mixed", meals: 3 },
    electricity: { kwh: 13, renewablePercent: 30 },
    shopping: { type: "home", spendUsd: 30 }
  },
  {
    date: "2026-06-19",
    transport: { mode: "walk", distanceKm: 4 },
    food: { mealType: "plant", meals: 2 },
    electricity: { kwh: 9, renewablePercent: 45 },
    shopping: { type: "services", spendUsd: 20 }
  },
  {
    date: "2026-06-20",
    transport: { mode: "car", distanceKm: 12 },
    food: { mealType: "dairy", meals: 3 },
    electricity: { kwh: 14, renewablePercent: 20 },
    shopping: { type: "electronics", spendUsd: 60 }
  },
  {
    date: "2026-06-21",
    transport: { mode: "train", distanceKm: 20 },
    food: { mealType: "mixed", meals: 3 },
    electricity: { kwh: 11, renewablePercent: 35 },
    shopping: { type: "services", spendUsd: 16 }
  }
];
