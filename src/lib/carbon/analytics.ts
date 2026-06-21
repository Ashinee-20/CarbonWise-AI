import type { DailyActivity, HistoricalComparison } from "@/types/carbon";
import { calculateActivityEmissions, sumCategories } from "./calculator";

export function compareHistory(activities: DailyActivity[]): HistoricalComparison {
  const sorted = [...activities].sort((a, b) => a.date.localeCompare(b.date));
  const currentWeekKg = round(sumActivityList(sorted.slice(-7)));
  const previousWeekKg = round(sumActivityList(sorted.slice(-14, -7)));
  const currentMonthKg = round(sumActivityList(sorted.slice(-30)));
  const previousMonthKg = round(sumActivityList(sorted.slice(-60, -30)));
  const weekDeltaPercent = percentChange(currentWeekKg, previousWeekKg);
  const monthDeltaPercent = percentChange(currentMonthKg, previousMonthKg);

  return {
    currentWeekKg,
    previousWeekKg,
    weekDeltaPercent,
    currentMonthKg,
    previousMonthKg,
    monthDeltaPercent,
    direction: getDirection(weekDeltaPercent)
  };
}

function sumActivityList(activities: DailyActivity[]): number {
  return activities.reduce((total, activity) => total + sumCategories(calculateActivityEmissions(activity)), 0);
}

function percentChange(current: number, previous: number): number {
  if (previous === 0 && current === 0) return 0;
  if (previous === 0) return 100;
  return round(((current - previous) / previous) * 100);
}

function getDirection(delta: number): HistoricalComparison["direction"] {
  if (delta < -3) return "improving";
  if (delta > 3) return "worsening";
  return "steady";
}

function round(value: number): number {
  return Number(value.toFixed(2));
}
