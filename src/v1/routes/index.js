const router = require('express').Router();
const healthCheckRouter = require('./healthcheck.routes.js');
const userRouter = require('./user.routes.js');

// healthCheck Route
router.use(healthCheckRouter);
// User Route
router.use(userRouter);

module.exports = router;
