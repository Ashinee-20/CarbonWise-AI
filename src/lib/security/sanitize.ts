export function sanitizeText(value: string): string {
  return value
    .replace(/[<>"'`]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 280);
}

export function sanitizeObject<T>(value: T): T {
  if (typeof value === "string") {
    return sanitizeText(value) as T;
  }
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeObject(item)) as T;
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [sanitizeText(key), sanitizeObject(item)])
    ) as T;
  }
  return value;
}
