import type { CoachResponse, DailyActivity } from "@/types/carbon";
import { compareHistory } from "./analytics";
import { runCoachAgents } from "./agents";
import { calculateSummary } from "./calculator";
import { forecastEmissions } from "./forecast";
import { buildCoachInsight, getDailyChallenge, getRecommendations } from "./recommendations";

export function createCoachResponse(activities: DailyActivity[]): CoachResponse {
  const summary = calculateSummary(activities);
  const agents = runCoachAgents(activities);

  return {
    summary,
    recommendations: getRecommendations(activities),
    challenge: getDailyChallenge(activities),
    insight: buildCoachInsight(activities),
    agents,
    comparison: compareHistory(activities),
    forecast: forecastEmissions(activities)
  };
}
