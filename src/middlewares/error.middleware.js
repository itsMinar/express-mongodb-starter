const { ZodError } = require('zod');
const CustomError = require('../utils/Error');
const logger = require('../logger/winston.logger');
const { ENV } = require('../config/env');

const buildValidationError = (zodError) =>
  CustomError.badRequest({
    message: 'Validation Error',
    errors: zodError.issues.map((issue) => issue.message),
    hints: 'Please review the request payload and try again.',
  });

const errorMiddleware = (err, _req, res, _next) => {
  const isZodError = err instanceof ZodError;
  const isCustomError = err instanceof CustomError;

  if (isZodError) {
    const validationError = buildValidationError(err);
    logger.warn(validationError.message, { errors: validationError.errors });

    return res.status(validationError.status).json({
      message: validationError.message,
      errors: validationError.errors,
      hints: validationError.hints,
    });
  }

  const statusCode = isCustomError ? err.status : 500;

  if (statusCode >= 500) {
    logger.error(err.stack || err.message);
  } else {
    logger.warn(err.message);
  }

  const response = {
    message:
      isCustomError || ENV === 'development'
        ? err.message
        : 'Something went wrong!',
    errors: isCustomError && err.errors.length ? err.errors : ['Server Error!'],
    hints: isCustomError ? err.hints : 'Please contact our technical team.',
  };

  res.status(statusCode).json(response);
};

module.exports = errorMiddleware;
