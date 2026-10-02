import rateLimit from "express-rate-limit";

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 150, // Limit each IP to 150 requests per window
  message: {
    success: false,
    message: "Too many requests from this node IP. System link throttled temporarily.",
    data: null,
    errors: null,
  },
  standardHeaders: true,
  legacyHeaders: false,
});
