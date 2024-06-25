const router = require('express').Router();
const registerUser = require('../controllers/user/registerUser.controller.js');
const getAllUsers = require('../controllers/user/getAllUsers.controller.js');

// create new user
router.route('/users').post(registerUser);
// get all users
router.route('/users').get(getAllUsers);

module.exports = router;
