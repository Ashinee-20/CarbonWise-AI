import type { Challenge, DailyActivity, Recommendation } from "@/types/carbon";
import { calculateActivityEmissions, calculateSummary } from "./calculator";

export function getRecommendations(activities: DailyActivity[]): Recommendation[] {
  const summary = calculateSummary(activities);
  const highest = Object.entries(summary.categoryKg).sort((a, b) => b[1] - a[1])[0]?.[0];
  const recent = activities[activities.length - 1];
  const ideas: Recommendation[] = [];

  if (highest === "transport" || recent?.transport.mode === "car") {
    ideas.push({
      id: "shift-commute",
      title: "Swap one car trip this week",
      detail: "Use train, bus, cycling, or ride sharing for your highest-distance routine trip.",
      impactKg: 8.4,
      category: "transport"
    });
  }
  if (highest === "food" || recent?.food.mealType === "meat") {
    ideas.push({
      id: "plant-forward",
      title: "Make two meals plant-forward",
      detail: "Replacing two meat-heavy meals with plant-rich meals can reduce daily food emissions quickly.",
      impactKg: 7,
      category: "food"
    });
  }
  if (highest === "electricity" || (recent?.electricity.kwh ?? 0) > 20) {
    ideas.push({
      id: "peak-energy",
      title: "Trim evening electricity peaks",
      detail: "Run appliances together, reduce standby loads, and raise cooling setpoints by one degree.",
      impactKg: 5.2,
      category: "electricity"
    });
  }
  if (highest === "shopping" || (recent?.shopping.spendUsd ?? 0) > 100) {
    ideas.push({
      id: "buy-better",
      title: "Delay one discretionary purchase",
      detail: "Use a 72-hour pause for non-essential purchases and prefer repair, rental, or second-hand options.",
      impactKg: 12,
      category: "shopping"
    });
  }

  return ideas.slice(0, 3);
}

export function getDailyChallenge(activities: DailyActivity[]): Challenge {
  const latest = activities[activities.length - 1];
  const latestKg = latest ? calculateActivityEmissions(latest) : null;
  const category =
    latestKg && Object.entries(latestKg).sort((a, b) => b[1] - a[1])[0]?.[0] === "shopping"
      ? "shopping"
      : "transport";

  if (category === "shopping") {
    return {
      id: "repair-rent-reuse",
      title: "Repair, rent, or reuse",
      detail: "Complete one need today without buying something new.",
      rewardPoints: 40,
      category: "shopping"
    };
  }

  return {
    id: "clean-mile",
    title: "Clean mile challenge",
    detail: "Replace at least 1 mile of car travel with walking, cycling, bus, or train.",
    rewardPoints: 35,
    category: "transport"
  };
}

export function buildCoachInsight(activities: DailyActivity[]): string {
  const summary = calculateSummary(activities);
  const top = Object.entries(summary.categoryKg).sort((a, b) => b[1] - a[1])[0];
  return `Your strongest opportunity is ${top[0]}, currently ${top[1].toFixed(
    1
  )} kg CO2e across logged days. Small repeated changes here will move your annual projection fastest.`;
}
