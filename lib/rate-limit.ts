type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const tracker = new Map<string, RateLimitEntry>();

/**
 * In-memory sliding window rate limiter
 * @param identifier Unique key (e.g. IP address or route name + user ID)
 * @param maxHits Max allowed requests in time window
 * @param windowMs Time window in milliseconds (default: 1 minute)
 */
export function checkRateLimit(
  identifier: string,
  maxHits: number = 10,
  windowMs: number = 60 * 1000
): { success: boolean; limit: number; remaining: number; resetInMs: number } {
  const now = Date.now();
  const entry = tracker.get(identifier);

  if (!entry || now > entry.resetAt) {
    tracker.set(identifier, {
      count: 1,
      resetAt: now + windowMs,
    });
    return { success: true, limit: maxHits, remaining: maxHits - 1, resetInMs: windowMs };
  }

  if (entry.count >= maxHits) {
    return {
      success: false,
      limit: maxHits,
      remaining: 0,
      resetInMs: entry.resetAt - now,
    };
  }

  entry.count += 1;
  return {
    success: true,
    limit: maxHits,
    remaining: maxHits - entry.count,
    resetInMs: entry.resetAt - now,
  };
}
