import { describe, expect, it } from "vitest";
import { calculateActivityEmissions, calculateSummary } from "./calculator";
import { sampleActivities } from "@/lib/data/sample-activities";

describe("carbon calculator", () => {
  it("calculates category emissions for one activity", () => {
    const emissions = calculateActivityEmissions({
      date: "2026-06-15",
      transport: { mode: "train", distanceKm: 18 },
      food: { mealType: "mixed", meals: 3 },
      electricity: { kwh: 12, renewablePercent: 25 },
      shopping: { type: "services", spendUsd: 18 }
    });

    expect(emissions.transport).toBeCloseTo(0.74);
    expect(emissions.food).toBeCloseTo(5.4);
    expect(emissions.electricity).toBeCloseTo(3.42);
    expect(emissions.shopping).toBeCloseTo(2.16);
  });

  it("builds a scored summary with annual projection and badges", () => {
    const summary = calculateSummary(sampleActivities);

    expect(summary.totalKg).toBeGreaterThan(0);
    expect(summary.score).toBeGreaterThanOrEqual(0);
    expect(summary.annualProjectionKg).toBeGreaterThan(summary.weeklyKg);
    expect(summary.badges.some((badge) => badge.id === "first-log" && badge.unlocked)).toBe(true);
  });
});
