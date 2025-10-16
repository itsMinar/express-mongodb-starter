const { createServer } = require('http');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const morganMiddleware = require('../logger/morgan.logger');
const CustomError = require('../utils/Error');
const { globalLimiter } = require('../middlewares/rateLimiter.middleware');
const errorMiddleware = require('../middlewares/error.middleware');
const { CORS_ORIGIN } = require('../config/env');

const buildCorsOptions = (allowedOrigins) => {
  const allowAllOrigins = allowedOrigins.includes('*');

  return {
    origin: (requestOrigin, callback) => {
      if (
        !requestOrigin ||
        allowAllOrigins ||
        allowedOrigins.includes(requestOrigin)
      ) {
        return callback(null, true);
      }

      return callback(
        CustomError.forbidden({
          message: 'Origin not allowed',
          errors: [`The origin ${requestOrigin} is not permitted.`],
          hints: 'Update CORS_ORIGIN to include this origin if required.',
        })
      );
    },
    credentials: true,
  };
};

const app = express();
const httpServer = createServer(app);

app.set('trust proxy', 1);
app.disable('x-powered-by');

app.use(helmet());
app.use(cors(buildCorsOptions(CORS_ORIGIN)));
app.use(compression());
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(morganMiddleware);
app.use(globalLimiter);

app.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: '🚀 Server is up and running',
  });
});

const todoRouter = require('../routes/todo.routes');

app.use('/api/v1/todos', todoRouter);

app.use((_req, _res, next) => {
  next(
    CustomError.notFound({
      message: 'Resource Not Found',
      errors: ['The requested resource does not exist.'],
      hints: 'Please check the URL and try again.',
    })
  );
});

app.use(errorMiddleware);

module.exports = { app, httpServer };
