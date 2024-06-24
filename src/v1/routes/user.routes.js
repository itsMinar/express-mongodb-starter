const router = require('express').Router();
const {
  registerUser,
  getAllUser,
} = require('../controllers/user.controller.js');

// create new user
router.route('/users').post(registerUser);
// get all users
router.route('/users').get(getAllUser);

module.exports = router;
