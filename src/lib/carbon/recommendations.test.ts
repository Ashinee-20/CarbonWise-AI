import { describe, expect, it } from "vitest";
import { sampleActivities } from "@/lib/data/sample-activities";
import { buildCoachInsight, getDailyChallenge, getRecommendations } from "./recommendations";

describe("recommendations", () => {
  it("creates contextual recommendations and a daily challenge", () => {
    const recommendations = getRecommendations(sampleActivities);
    const challenge = getDailyChallenge(sampleActivities);

    expect(recommendations.length).toBeGreaterThan(0);
    expect(recommendations.every((item) => item.impactKg > 0)).toBe(true);
    expect(challenge.detail).toContain("Replace");
  });

  it("explains the user's top opportunity", () => {
    expect(buildCoachInsight(sampleActivities)).toContain("strongest opportunity");
  });
});
