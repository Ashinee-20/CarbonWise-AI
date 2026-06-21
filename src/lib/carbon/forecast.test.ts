import { describe, expect, it } from "vitest";
import { sampleActivities } from "@/lib/data/sample-activities";
import { forecastEmissions } from "./forecast";

describe("forecasting", () => {
  it("projects future footprint from recent behavior", () => {
    const forecast = forecastEmissions(sampleActivities);

    expect(forecast.nextWeekKg).toBeGreaterThan(0);
    expect(forecast.nextMonthKg).toBeGreaterThan(forecast.nextWeekKg);
    expect(forecast.confidence).toBeGreaterThanOrEqual(55);
  });
});
