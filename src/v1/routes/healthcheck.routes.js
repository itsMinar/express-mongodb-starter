const router = require('express').Router();
const healthCheck = require('../controllers/healthcheck.controller.js');

router.route('/healthcheck').get(healthCheck);

module.exports = router;
