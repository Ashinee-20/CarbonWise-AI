import { describe, expect, it } from "vitest";
import { sampleActivities } from "@/lib/data/sample-activities";
import { createCoachResponse } from "./coach";

describe("coach orchestration", () => {
  it("combines summary, recommendations, agents, challenge, comparison, assistant guidance, and forecast", () => {
    const response = createCoachResponse(sampleActivities);

    expect(response.summary.totalKg).toBeGreaterThan(0);
    expect(response.recommendations.length).toBeGreaterThan(0);
    expect(response.challenge.rewardPoints).toBeGreaterThan(0);
    expect(response.agents).toHaveLength(5);
    expect(response.assistant.headline).toContain("carbon footprint");
    expect(response.assistant.actionPlan.length).toBeGreaterThan(0);
    expect(response.comparison.currentWeekKg).toBeGreaterThan(0);
    expect(response.forecast.nextMonthKg).toBeGreaterThan(0);
  });
});
