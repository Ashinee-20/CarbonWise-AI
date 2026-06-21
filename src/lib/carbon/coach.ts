import type { CoachResponse, DailyActivity } from "@/types/carbon";
import { compareHistory } from "./analytics";
import { runCoachAgents } from "./agents";
import { calculateSummary } from "./calculator";
import { forecastEmissions } from "./forecast";
import { buildAssistantResponse } from "./assistant";
import { buildCoachInsight, getDailyChallenge, getRecommendations } from "./recommendations";

export function createCoachResponse(activities: DailyActivity[]): CoachResponse {
  const summary = calculateSummary(activities);
  const recommendations = getRecommendations(activities);
  const agents = runCoachAgents(activities);
  const assistant = buildAssistantResponse(activities, summary, recommendations);

  return {
    summary,
    recommendations,
    challenge: getDailyChallenge(activities),
    insight: buildCoachInsight(activities),
    assistant,
    agents,
    comparison: compareHistory(activities),
    forecast: forecastEmissions(activities)
  };
}
