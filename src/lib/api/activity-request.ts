import { NextRequest } from "next/server";
import { sanitizeObject } from "@/lib/security/sanitize";
import { activityListSchema } from "@/lib/validation/activity";
import type { DailyActivity } from "@/types/carbon";

export type ActivityRequestResult =
  | { ok: true; activities: DailyActivity[] }
  | { ok: false; status: 400; error: string; issues?: unknown };

export async function parseActivityRequest(request: NextRequest): Promise<ActivityRequestResult> {
  let body: unknown;

  try {
    body = sanitizeObject(await request.json());
  } catch {
    return { ok: false, status: 400, error: "Malformed JSON payload" };
  }

  const parsed = activityListSchema.safeParse((body as { activities?: unknown }).activities);

  if (!parsed.success) {
    return {
      ok: false,
      status: 400,
      error: "Invalid activity payload",
      issues: parsed.error.flatten()
    };
  }

  return { ok: true, activities: parsed.data };
}
