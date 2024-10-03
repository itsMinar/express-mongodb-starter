const formatError = (err) => {
  const error = {
    message: err?.message ? err.message : err.toString(),
    errors: err.errors || [],
    hints: err.hints
      ? `${err.hints}. If the problem is not resolved, please feel free to contact our technical team.`
      : 'Please contact our technical team.',
  };

  return error;
};

class CustomError {
  static badRequest(error) {
    const err = formatError(error);
    return {
      status: 400,
      ...err,
    };
  }

  static unauthenticated(error) {
    const err = formatError(error);
    return {
      status: 401,
      ...err,
    };
  }

  static unauthorized(error) {
    const err = formatError(error);
    return {
      status: 403,
      ...err,
    };
  }

  static notFound(error) {
    const err = formatError(error);
    return {
      status: 404,
      ...err,
    };
  }

  static conflict(error) {
    const err = formatError(error);
    return {
      status: 409,
      ...err,
    };
  }

  static serverError(error) {
    const err = formatError(error);
    return {
      status: 500,
      ...err,
    };
  }

  static throwError(error) {
    const err = new Error(error.message);
    err.status = error.status;
    err.errors = error.errors;
    err.hints = error.hints;

    throw err;
  }
}

module.exports = CustomError;
