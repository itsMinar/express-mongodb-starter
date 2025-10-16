const { rateLimit } = require('express-rate-limit');
const CustomError = require('../utils/Error');

const formatRetryAfter = (retryAfterMs) => {
  const minutes = Math.floor(retryAfterMs / 60000);
  const seconds = Math.ceil((retryAfterMs % 60000) / 1000);

  if (minutes < 1) {
    return `${seconds} second${seconds !== 1 ? 's' : ''}`;
  }

  return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
};

const respondWithLimitError = (res, { message, errors, hints, status }) =>
  res.status(status).json({ message, errors, hints });

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, _next, options) => {
    const retryAfterMs = req.rateLimit?.resetTime
      ? req.rateLimit.resetTime - Date.now()
      : options.windowMs;

    const retryAfter = formatRetryAfter(Math.max(retryAfterMs, 0));

    const error = CustomError.tooManyRequest({
      message: 'Too Many Requests',
      errors: [
        `There are too many requests. You are only allowed ${options.limit} requests per ${
          options.windowMs / 60000
        } minutes. Please try again in ${retryAfter}.`,
      ],
      hints: 'Please try again later',
    });

    respondWithLimitError(res, error);
  },
});

const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res, _next, options) => {
    const error = CustomError.tooManyRequest({
      message: 'Too Many Requests',
      errors: [
        `There are too many requests. You are only allowed ${options.limit} requests per ${
          options.windowMs / 60000
        } minutes.`,
      ],
      hints: 'Please try again later.',
    });

    respondWithLimitError(res, error);
  },
});

module.exports = { globalLimiter, authLimiter };
