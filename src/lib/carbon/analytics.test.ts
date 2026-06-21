import { describe, expect, it } from "vitest";
import { sampleActivities } from "@/lib/data/sample-activities";
import { compareHistory } from "./analytics";

describe("analytics comparison", () => {
  it("compares current and previous logged periods", () => {
    const comparison = compareHistory(sampleActivities);

    expect(comparison.currentWeekKg).toBeGreaterThan(0);
    expect(comparison.previousWeekKg).toBeGreaterThan(0);
    expect(comparison.weekDeltaPercent).toEqual(expect.any(Number));
    expect(["improving", "worsening", "steady"]).toContain(comparison.direction);
  });
});
