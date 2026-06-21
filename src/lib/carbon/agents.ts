import type { ActivityCategory, CoachAgentInsight, DailyActivity } from "@/types/carbon";
import { calculateSummary } from "./calculator";

type AgentDefinition = {
  id: string;
  name: string;
  specialty: ActivityCategory;
  build: (activities: DailyActivity[]) => Omit<CoachAgentInsight, "id" | "name" | "specialty">;
};

const agentDefinitions: AgentDefinition[] = [
  {
    id: "ai-agent",
    name: "AI Agent",
    specialty: "overall",
    build: (activities) => {
      const summary = calculateSummary(activities);
      const top = Object.entries(summary.categoryKg).sort((a, b) => b[1] - a[1])[0];
      const averageDaily = summary.totalKg / Math.max(activities.length, 1);
      const topCategory = top?.[0] ?? "transport";
      const topValue = top?.[1] ?? 0;

      return {
        finding: `Your average daily footprint is ${averageDaily.toFixed(1)} kg CO2e, with ${topCategory} at ${topValue.toFixed(1)} kg.`,
        action: `Focus first on ${topCategory} and follow the highest-impact actions for a measurable weekly reduction.`,
        priority: "high",
        estimatedWeeklySavingsKg: Math.max(6.5, Number((averageDaily * 0.8).toFixed(1)))
      };
    }
  },
  {
    id: "mobility-agent",
    name: "Mobility Agent",
    specialty: "transport",
    build: (activities) => {
      const latest = activities[activities.length - 1];
      const distance = latest?.transport.distanceKm ?? 0;
      const isCarHeavy = latest?.transport.mode === "car" && distance >= 8;

      return {
        finding: isCarHeavy ? `Your latest car travel was ${distance.toFixed(1)} km.` : "Your recent mobility mix is already relatively efficient.",
        action: isCarHeavy ? "Replace the longest car errand with train, bus, bike, or bundled trip planning." : "Keep protecting low-carbon travel days and avoid rebound car trips.",
        priority: isCarHeavy ? "high" : "low",
        estimatedWeeklySavingsKg: isCarHeavy ? 6.8 : 1.2
      };
    }
  },
  {
    id: "food-agent",
    name: "Food Agent",
    specialty: "food",
    build: (activities) => {
      const meatDays = activities.slice(-7).filter((activity) => activity.food.mealType === "meat").length;
      return {
        finding: `${meatDays} of your last 7 logged days were meat-heavy.`,
        action: meatDays > 1 ? "Choose two plant-forward meals this week and keep protein familiar with beans, lentils, tofu, or eggs." : "Maintain the current pattern and make plant-forward meals your default when eating out.",
        priority: meatDays > 1 ? "high" : "medium",
        estimatedWeeklySavingsKg: meatDays > 1 ? 7.4 : 2.1
      };
    }
  },
  {
    id: "energy-agent",
    name: "Energy Agent",
    specialty: "electricity",
    build: (activities) => {
      const latest = activities[activities.length - 1];
      const renewable = latest?.electricity.renewablePercent ?? 0;
      const highUsage = (latest?.electricity.kwh ?? 0) > 14;
      return {
        finding: `Your latest electricity entry used ${latest?.electricity.kwh.toFixed(1) ?? "0.0"} kWh with ${renewable.toFixed(0)}% renewable supply.`,
        action: highUsage ? "Shift laundry and cooling loads, reduce standby power, and group appliance use outside peak hours." : "Keep usage below your current baseline and raise renewable share when available.",
        priority: highUsage ? "medium" : "low",
        estimatedWeeklySavingsKg: highUsage ? 3.9 : 1
      };
    }
  },
  {
    id: "lifestyle-agent",
    name: "Lifestyle Agent",
    specialty: "shopping",
    build: (activities) => {
      const weeklySpend = activities.slice(-7).reduce((sum, activity) => sum + activity.shopping.spendUsd, 0);
      return {
        finding: `Recent shopping spend is $${weeklySpend.toFixed(0)} across the last 7 logged days.`,
        action: weeklySpend > 150 ? "Use a 72-hour pause for discretionary buys and try repair, rental, resale, or borrowing first." : "Keep spend intentional and prioritize durable, repairable purchases.",
        priority: weeklySpend > 150 ? "high" : "medium",
        estimatedWeeklySavingsKg: weeklySpend > 150 ? 10.5 : 2.8
      };
    }
  }
];

export function runCoachAgents(activities: DailyActivity[]): CoachAgentInsight[] {
  const summary = calculateSummary(activities);
  const highestCategory = Object.entries(summary.categoryKg).sort((a, b) => b[1] - a[1])[0]?.[0];

  return agentDefinitions
    .map((agent) => ({
      id: agent.id,
      name: agent.name,
      specialty: agent.specialty,
      ...agent.build(activities)
    }))
    .sort((a, b) => priorityScore(b, highestCategory) - priorityScore(a, highestCategory));
}

function priorityScore(agent: CoachAgentInsight, highestCategory?: string): number {
  const base = agent.priority === "high" ? 3 : agent.priority === "medium" ? 2 : 1;
  const categoryBonus = agent.specialty === highestCategory ? 1 : agent.specialty === "overall" ? 2 : 0;
  return base + categoryBonus;
}
