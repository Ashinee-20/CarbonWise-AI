import { describe, expect, it } from "vitest";
import { sanitizeObject, sanitizeText } from "./sanitize";

describe("sanitization", () => {
  it("removes script-sensitive characters from text", () => {
    expect(sanitizeText("<script>alert('x')</script>")).not.toContain("<");
  });

  it("sanitizes nested payloads", () => {
    const clean = sanitizeObject<Record<string, string[]>>({ "<bad>": ["hello   world", "`x`"] });

    expect(Object.keys(clean)[0]).toBe("bad");
    expect(clean["bad"][0]).toBe("hello world");
  });
});
