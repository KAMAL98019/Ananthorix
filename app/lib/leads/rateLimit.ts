// Fixed-window rate limit, in memory, per client address.
// Limitation: each server instance keeps its own counters, and serverless platforms (Vercel) may run several
// instances or reset them, so this is best-effort only. A shared store (for example Upstash Redis) should
// replace it if spam becomes a problem.

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

export type RateLimiter = (key: string, now?: number) => boolean;

export function createRateLimiter(max = MAX_PER_WINDOW, windowMs = WINDOW_MS): RateLimiter {
  const hits = new Map<string, { count: number; windowStart: number }>();

  // Keeps the map from growing without bound.
  const pruneIfLarge = (now: number) => {
    if (hits.size < 5000) return;
    for (const [key, entry] of hits) {
      if (now - entry.windowStart >= windowMs) hits.delete(key);
    }
  };

  return (key, now = Date.now()) => {
    const entry = hits.get(key);
    if (!entry || now - entry.windowStart >= windowMs) {
      hits.set(key, { count: 1, windowStart: now });
      pruneIfLarge(now);
      return true;
    }
    if (entry.count >= max) return false;
    entry.count += 1;
    return true;
  };
}

// Shared limiter for the live endpoint.
export const isAllowed = createRateLimiter();

export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  return first || request.headers.get("x-real-ip") || "unknown";
}
