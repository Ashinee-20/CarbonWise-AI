import { describe, expect, it } from "vitest";
import { sampleActivities } from "@/lib/data/sample-activities";
import { activityListSchema, activitySchema } from "./activity";

describe("activity validation", () => {
  it("accepts valid activity logs", () => {
    expect(activityListSchema.safeParse(sampleActivities).success).toBe(true);
  });

  it("rejects unsafe or unrealistic values", () => {
    const result = activitySchema.safeParse({
      ...sampleActivities[0],
      electricity: { kwh: 999, renewablePercent: 120 }
    });

    expect(result.success).toBe(false);
  });
});
