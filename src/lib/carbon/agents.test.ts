import { describe, expect, it } from "vitest";
import { sampleActivities } from "@/lib/data/sample-activities";
import { runCoachAgents } from "./agents";

describe("coach agents", () => {
  it("returns one specialist insight for each footprint category", () => {
    const agents = runCoachAgents(sampleActivities);

    expect(agents).toHaveLength(4);
    expect(agents.map((agent) => agent.specialty).sort()).toEqual(["electricity", "food", "shopping", "transport"]);
    expect(agents.every((agent) => agent.action.length > 20)).toBe(true);
  });

  it("prioritizes high-impact agents first", () => {
    const agents = runCoachAgents(sampleActivities);

    expect(["high", "medium"]).toContain(agents[0].priority);
    expect(agents[0].estimatedWeeklySavingsKg).toBeGreaterThan(0);
  });
});
