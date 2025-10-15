const { rateLimit } = require('express-rate-limit');
const CustomError = require('../utils/Error');

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res, _next, options) => {
    // Calculate how long until the limit resets
    const retryAfterMs = req.rateLimit?.resetTime
      ? req.rateLimit.resetTime - Date.now()
      : options.windowMs;

    // Convert to minutes or seconds based on remaining time
    const retryAfterMinutes = Math.floor(retryAfterMs / 60000);
    const retryAfterSeconds = Math.ceil((retryAfterMs % 60000) / 1000);

    // Format human-readable time
    let retryAfterStr;
    if (retryAfterMinutes < 1) {
      retryAfterStr = `${retryAfterSeconds} second${retryAfterSeconds !== 1 ? 's' : ''}`;
    } else {
      retryAfterStr = `${retryAfterMinutes} minute${retryAfterMinutes !== 1 ? 's' : ''}`;
    }

    const error = CustomError.tooManyRequest({
      message: 'Too Many Request',
      errors: [
        `There are too many requests. You are only allowed ${
          options.limit
        } requests per ${options.windowMs / 60000} minutes. Please try again in ${retryAfterStr}.`,
      ],
      hints: 'Please try again later',
    });

    return res.status(error.status).json({ ...error, status: undefined });
  },
});

const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res, _next, options) => {
    const error = CustomError.tooManyRequest({
      message: 'Too Many Request',
      errors: [
        `There are too many requests. You are only allowed ${
          options.limit
        } requests per ${options.windowMs / 60000} minutes`,
      ],
      hints: 'Please try again later',
    });

    return res.status(error.status).json({ ...error, status: undefined });
  },
});

module.exports = { globalLimiter, authLimiter };
