import { NextRequest, NextResponse } from "next/server";
import { parseActivityRequest } from "@/lib/api/activity-request";
import { createCoachResponse } from "@/lib/carbon/coach";
import { rateLimit } from "@/lib/security/rate-limit";

export async function POST(request: NextRequest) {
  const limit = rateLimit(request);
  if (!limit.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429, headers: { "Retry-After": String(limit.retryAfter) } });
  }

  const parsed = await parseActivityRequest(request);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error, issues: parsed.issues }, { status: parsed.status });
  }

  return NextResponse.json(createCoachResponse(parsed.activities));
}
