const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morganMiddleware = require('../logger/morgan.logger.js');
const CustomError = require('../utils/Error.js');
const errorMiddleware = require('../middlewares/error.middleware.js');

// initialize express app
const app = express();

// add middlewares to the app
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

// logger middleware
app.use(morganMiddleware);

// health check
app.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: '🚀 Server is up and running',
  });
});

// routes import
const todoRouter = require('../routes/todo.routes.js');

// routes declaration
app.use('/api/v1/todos', todoRouter);

// Not Found Handler
app.use((_req, res) => {
  const error = CustomError.notFound({
    message: 'Resource Not Found',
    errors: ['The requested resource does not exist'],
    hints: 'Please check the URL and try again',
  });

  res.status(error.status).json({ ...error, status: undefined });
});

// Global Error Handler
app.use(errorMiddleware);

// export the app
module.exports = app;
