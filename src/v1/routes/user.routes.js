const router = require('express').Router();
const registerUser = require('../controllers/user/registerUser.controller.js');
const loginUser = require('../controllers/user/loginUser.controller.js');

// register user
router.route('/register').post(registerUser);
// login user
router.route('/login').post(loginUser);

module.exports = router;
