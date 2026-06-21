import { NextRequest, NextResponse } from "next/server";
import { calculateSummary } from "@/lib/carbon/calculator";
import { rateLimit } from "@/lib/security/rate-limit";
import { sanitizeObject } from "@/lib/security/sanitize";
import { activityListSchema } from "@/lib/validation/activity";

export async function POST(request: NextRequest) {
  const limit = rateLimit(request);
  if (!limit.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429, headers: { "Retry-After": String(limit.retryAfter) } });
  }

  const body = sanitizeObject(await request.json());
  const parsed = activityListSchema.safeParse(body.activities);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid activity payload", issues: parsed.error.flatten() }, { status: 400 });
  }

  return NextResponse.json({ summary: calculateSummary(parsed.data) });
}
