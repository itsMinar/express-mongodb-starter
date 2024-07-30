const router = require('express').Router();
const healthCheckRouter = require('./healthcheck.routes.js');
const userRouter = require('./user.routes.js');

// healthCheck Route
router.use('/health-check', healthCheckRouter);
// User Route
router.use('/users', userRouter);

module.exports = router;
