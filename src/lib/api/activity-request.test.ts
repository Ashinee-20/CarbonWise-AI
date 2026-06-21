import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { sampleActivities } from "@/lib/data/sample-activities";
import { parseActivityRequest } from "./activity-request";

describe("activity request parser", () => {
  it("parses and sanitizes valid activity payloads", async () => {
    const request = new NextRequest("https://carbonwise.test/api/coach", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ activities: sampleActivities.slice(0, 1) })
    });

    const result = await parseActivityRequest(request);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.activities).toHaveLength(1);
    }
  });

  it("rejects malformed JSON without throwing", async () => {
    const request = new NextRequest("https://carbonwise.test/api/coach", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{not-json"
    });

    const result = await parseActivityRequest(request);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe("Malformed JSON payload");
    }
  });
});
