/**
 * Rate Limiter Middleware
 * Allows a specified number of requests per time window per IP address
 */

/**
 * In-memory store for tracking request timestamps by client IP.
 * Key: client IP address (string)
 * Value: Object containing array of request timestamps (number[])
 * @type {Map<string, { timestamps: number[] }>}
 */
const requestStore = new Map();

/**
 * Creates an Express rate limiter middleware.
 * Restricts the number of HTTP requests a client (identified by IP) can make
 * within a specified time window. Bypassed in development mode.
 *
 * @param {number} [maxRequests=5] - The maximum number of requests allowed in the window.
 * @param {number} [windowMs=900000] - The duration of the sliding window in milliseconds (default is 15 minutes).
 * @returns {import("express").RequestHandler} Express middleware function that handles rate limiting.
 */
export const createRateLimiter = (maxRequests = 5, windowMs = 15 * 60 * 1000) => {
  return (req, res, next) => {
    // Skip rate limiting in development mode
    const isDevelopment = process.env.NODE_ENV === "development" || !process.env.NODE_ENV;
    if (isDevelopment) {
      return next();
    }

    const ip = req.ip || req.connection.remoteAddress || "unknown";
    const now = Date.now();

    // Initialize or get existing request data for this IP
    if (!requestStore.has(ip)) {
      requestStore.set(ip, { timestamps: [] });
    }

    const userData = requestStore.get(ip);
    const { timestamps } = userData;

    // Remove timestamps outside the current window
    userData.timestamps = timestamps.filter((timestamp) => now - timestamp < windowMs);

    // Check if limit exceeded
    if (userData.timestamps.length >= maxRequests) {
      const oldestTimestamp = userData.timestamps[0];
      const resetTime = new Date(oldestTimestamp + windowMs);
      const secondsUntilReset = Math.ceil((resetTime - now) / 1000);
      const minutesUntilReset = Math.ceil(secondsUntilReset / 60);

      return res.status(429).json({
        success: false,
        error: {
          code: "RATE_LIMIT_EXCEEDED",
          title: "Too Many Questions",
          description: `You've asked too many questions. Please wait before asking more.`,
          details: {
            limit: maxRequests,
            timeWindow: `${windowMs / 1000 / 60} minutes`,
            remainingTime: `${minutesUntilReset} minute${minutesUntilReset > 1 ? 's' : ''}`,
            secondsUntilReset: secondsUntilReset,
            resetAt: resetTime.toISOString(),
          },
          suggestion: `You can ask your next question in ${minutesUntilReset} minute${minutesUntilReset > 1 ? 's' : ''}.`,
        },
      });
    }

    // Add current request timestamp
    userData.timestamps.push(now);

    // Add rate limit info to response headers
    res.setHeader("X-RateLimit-Limit", maxRequests);
    res.setHeader("X-RateLimit-Remaining", maxRequests - userData.timestamps.length);
    res.setHeader("X-RateLimit-Reset", new Date(now + windowMs).toISOString());

    next();
  };
};

/**
 * Default rate limiter: 5 questions per 15 minutes
 */
export const askRateLimiter = createRateLimiter(50, 15 * 60 * 1000);

/**
 * Clean up old entries periodically to prevent memory leaks
 * Runs every 15 minutes
 */
setInterval(() => {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;

  for (const [ip, userData] of requestStore.entries()) {
    userData.timestamps = userData.timestamps.filter((timestamp) => now - timestamp < windowMs);
    if (userData.timestamps.length === 0) {
      requestStore.delete(ip);
    }
  }
}, 15 * 60 * 1000);
