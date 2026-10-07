// Fixed-window rate limit, in memory, per client address.
// Limitation: each server instance keeps its own counters. Serverless platforms may reset them.
// A shared store (for example Redis) should replace this before high-traffic launch.

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; windowStart: number }>();

export function isAllowed(key: string, now = Date.now()): boolean {
  const entry = hits.get(key);
  if (!entry || now - entry.windowStart >= WINDOW_MS) {
    hits.set(key, { count: 1, windowStart: now });
    pruneIfLarge(now);
    return true;
  }
  if (entry.count >= MAX_PER_WINDOW) return false;
  entry.count += 1;
  return true;
}

// Keeps the map from growing without bound.
function pruneIfLarge(now: number) {
  if (hits.size < 5000) return;
  for (const [key, entry] of hits) {
    if (now - entry.windowStart >= WINDOW_MS) hits.delete(key);
  }
}

export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  return first || request.headers.get("x-real-ip") || "unknown";
}
