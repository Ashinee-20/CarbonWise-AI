import type { CategoryEmissions, DailyActivity, FootprintSummary } from "@/types/carbon";
import { gridKgPerKwh, mealKg, shoppingKgPerUsd, transportKgPerKm } from "./factors";

export function calculateActivityEmissions(activity: DailyActivity): CategoryEmissions {
  const transport = activity.transport.distanceKm * transportKgPerKm[activity.transport.mode];
  const food = activity.food.meals * mealKg[activity.food.mealType];
  const electricity =
    activity.electricity.kwh * gridKgPerKwh * (1 - activity.electricity.renewablePercent / 100);
  const shopping = activity.shopping.spendUsd * shoppingKgPerUsd[activity.shopping.type];

  return roundCategories({ transport, food, electricity, shopping });
}

export function calculateSummary(activities: DailyActivity[]): FootprintSummary {
  const sorted = [...activities].sort((a, b) => a.date.localeCompare(b.date));
  const categoryKg = sorted.reduce<CategoryEmissions>(
    (acc, activity) => {
      const item = calculateActivityEmissions(activity);
      acc.transport += item.transport;
      acc.food += item.food;
      acc.electricity += item.electricity;
      acc.shopping += item.shopping;
      return acc;
    },
    { transport: 0, food: 0, electricity: 0, shopping: 0 }
  );

  const totalKg = round(sumCategories(categoryKg));
  const recentSeven = sorted.slice(-7);
  const recentThirty = sorted.slice(-30);
  const weeklyKg = round(sumActivityList(recentSeven));
  const monthlyKg = round(sumActivityList(recentThirty));
  const averageDaily = totalKg / Math.max(sorted.length, 1);
  const annualProjectionKg = round(averageDaily * 365);
  const score = Math.max(0, Math.min(100, Math.round(100 - averageDaily * 3.5)));
  const streak = calculateStreak(sorted);

  return {
    totalKg,
    categoryKg: roundCategories(categoryKg),
    score,
    streak,
    badges: buildBadges(score, streak, categoryKg, sorted),
    weeklyKg,
    monthlyKg,
    annualProjectionKg
  };
}

export function sumCategories(categories: CategoryEmissions): number {
  return categories.transport + categories.food + categories.electricity + categories.shopping;
}

function sumActivityList(activities: DailyActivity[]): number {
  return activities.reduce((total, activity) => total + sumCategories(calculateActivityEmissions(activity)), 0);
}

function calculateStreak(activities: DailyActivity[]): number {
  if (activities.length === 0) return 0;
  const dates = new Set(activities.map((activity) => activity.date));
  const cursor = new Date(`${activities[activities.length - 1].date}T00:00:00Z`);
  let streak = 0;

  while (dates.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }

  return streak;
}

function buildBadges(score: number, streak: number, categories: CategoryEmissions, activities: DailyActivity[]) {
  const lowTransportDays = activities.filter((activity) => ["walk", "bike", "train"].includes(activity.transport.mode));
  return [
    {
      id: "first-log",
      label: "First Footprint",
      description: "Logged the first sustainability day.",
      unlocked: activities.length > 0
    },
    {
      id: "low-carbon-commuter",
      label: "Low-carbon Commuter",
      description: "Chose a cleaner transport mode three times.",
      unlocked: lowTransportDays.length >= 3
    },
    {
      id: "energy-optimizer",
      label: "Energy Optimizer",
      description: "Kept electricity emissions below food emissions.",
      unlocked: categories.electricity < categories.food
    },
    {
      id: "climate-streak",
      label: "Climate Streak",
      description: "Maintained a daily logging streak.",
      unlocked: streak >= 5
    },
    {
      id: "wise-score",
      label: "Wise Score",
      description: "Reached a sustainability score above 80.",
      unlocked: score >= 80
    }
  ];
}

function round(value: number): number {
  return Number(value.toFixed(2));
}

function roundCategories(categories: CategoryEmissions): CategoryEmissions {
  return {
    transport: round(categories.transport),
    food: round(categories.food),
    electricity: round(categories.electricity),
    shopping: round(categories.shopping)
  };
}
