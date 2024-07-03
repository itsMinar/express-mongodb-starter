class ApiResponse {
  constructor(statusCode, data, message = 'Success', extraProperties = {}) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;

    // Assign any additional properties
    Object.assign(this, extraProperties);
  }
}

module.exports = { ApiResponse };
