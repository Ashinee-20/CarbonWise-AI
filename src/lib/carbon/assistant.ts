import type { AssistantResponse, DailyActivity, FootprintSummary, Recommendation } from "@/types/carbon";

const focusAreaMessages: Record<string, string> = {
  transport: "Your travel habits are a key climate signal; prioritize low-carbon routes and shared trips.",
  food: "Food choices are a powerful lever; plant-forward meals can immediately lower your footprint.",
  electricity: "Electricity use is predictable and easy to optimize with timing and renewable choices.",
  shopping: "Intentional spending reduces embodied emissions and supports a circular lifestyle.",
  overall: "Taking a balanced perspective helps you reduce your total footprint without false trade-offs."
};

export function buildAssistantResponse(
  activities: DailyActivity[],
  summary: FootprintSummary,
  recommendations: Recommendation[]
): AssistantResponse {
  const dominantCategory = Object.entries(summary.categoryKg).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "transport";
  const primaryRecommendation = recommendations[0];
  const recentDays = Math.min(activities.length, 7);

  return {
    headline: `Your carbon footprint summary is ${summary.totalKg.toFixed(1)} kg across ${activities.length} logged days.`,
    focusAreas: [
      focusAreaMessages[dominantCategory] ?? focusAreaMessages.overall,
      `Maintain your logging streak (${summary.streak} days) to keep progress visible and consistent.`,
      `Watch the monthly forecast: ${summary.annualProjectionKg.toLocaleString()} kg projected annually if habits remain unchanged.`
    ],
    actionPlan: [
      `Start with the top recommendation: ${primaryRecommendation?.title ?? "log more data to refine advice"}.`,
      `Apply changes for at least ${recentDays} days in a row and compare your weekly trend against the prior period.`,
      `Refresh the coach after updating activities to track how your priorities and savings change.`
    ]
  };
}
