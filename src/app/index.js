const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

// routes import
const routesV1 = require('../v1/routes/index.js');

// routes declaration
app.use('/api/v1', routesV1);

// Not Found Handler
app.use((_req, res) => {
  res.status(404).json({
    message: 'Resource Not Found',
    error: 'The requested resource does not exist',
    hints: 'Please check the URL and try again',
  });
});

module.exports = { app };
