const morgan = require('morgan');
const logger = require('./winston.logger.js');
const { ENV } = require('../config/env.js');

const stream = {
  // Use the http severity
  write: (message) => logger.http(message.trim()),
};

const skip = () => ENV !== 'development';

const morganMiddleware = morgan(
  ':remote-addr :method :url :status - :response-time ms',
  { stream, skip }
);

module.exports = morganMiddleware;
