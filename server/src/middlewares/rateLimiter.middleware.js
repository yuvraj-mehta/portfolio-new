/**
 * Rate Limiter Middleware
 * Allows a specified number of requests per time window per IP address
 */

// In-memory store for request tracking
// Format: { ip: { timestamps: [timestamp1, timestamp2, ...] } }
const requestStore = new Map();

/**
 * Create a rate limiter middleware
 * @param {number} maxRequests - Maximum number of requests allowed
 * @param {number} windowMs - Time window in milliseconds
 * @returns {Function} Express middleware function
 */
export const createRateLimiter = (maxRequests = 5, windowMs = 10 * 60 * 1000) => {
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
 * Default rate limiter: 5 questions per 10 minutes
 */
export const askRateLimiter = createRateLimiter(5, 10 * 60 * 1000);

/**
 * Clean up old entries periodically to prevent memory leaks
 * Runs every 10 minutes
 */
setInterval(() => {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;

  for (const [ip, userData] of requestStore.entries()) {
    userData.timestamps = userData.timestamps.filter((timestamp) => now - timestamp < windowMs);
    if (userData.timestamps.length === 0) {
      requestStore.delete(ip);
    }
  }
}, 10 * 60 * 1000);
