const appendSupportHint = (hints) => {
  if (!hints) {
    return 'Please contact our technical team.';
  }

  return `${hints}. If the problem is not resolved, please feel free to contact our technical team.`;
};

class CustomError extends Error {
  constructor(status, message, { errors = [], hints } = {}) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.errors = errors;
    this.hints = appendSupportHint(hints);

    Error.captureStackTrace(this, this.constructor);
  }

  static #build(status, { message, errors, hints } = {}) {
    const errorMessage = message || 'Unexpected error occurred.';

    return new CustomError(status, errorMessage, {
      errors: Array.isArray(errors) ? errors : [],
      hints,
    });
  }

  static badRequest(payload) {
    return this.#build(400, payload);
  }

  static unauthenticated(payload) {
    return this.#build(401, payload);
  }

  static unauthorized(payload) {
    return this.#build(403, payload);
  }

  static forbidden(payload) {
    return this.#build(403, payload);
  }

  static notFound(payload) {
    return this.#build(404, payload);
  }

  static conflict(payload) {
    return this.#build(409, payload);
  }

  static tooManyRequest(payload) {
    return this.#build(429, payload);
  }

  static serverError(payload = {}) {
    return this.#build(500, { message: 'Internal Server Error', ...payload });
  }
}

module.exports = CustomError;
