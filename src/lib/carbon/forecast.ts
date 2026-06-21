import type { DailyActivity } from "@/types/carbon";
import { calculateActivityEmissions, sumCategories } from "./calculator";

export function forecastEmissions(activities: DailyActivity[]) {
  const dailyTotals = activities.map((activity) => sumCategories(calculateActivityEmissions(activity)));
  const recent = dailyTotals.slice(-14);
  const average = recent.reduce((sum, item) => sum + item, 0) / Math.max(recent.length, 1);
  const trend = calculateTrend(recent);

  return {
    nextWeekKg: round((average + trend) * 7),
    nextMonthKg: round((average + trend) * 30),
    confidence: Math.min(92, Math.max(55, 55 + recent.length * 3))
  };
}

function calculateTrend(values: number[]): number {
  if (values.length < 2) return 0;
  const midpoint = Math.floor(values.length / 2);
  const first = values.slice(0, midpoint);
  const second = values.slice(midpoint);
  const firstAvg = first.reduce((sum, item) => sum + item, 0) / first.length;
  const secondAvg = second.reduce((sum, item) => sum + item, 0) / second.length;
  return (secondAvg - firstAvg) / Math.max(values.length, 1);
}

function round(value: number): number {
  return Number(value.toFixed(2));
}
