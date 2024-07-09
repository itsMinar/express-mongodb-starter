const router = require('express').Router();
const registerUser = require('../controllers/user/registerUser.controller.js');
const loginUser = require('../controllers/user/loginUser.controller.js');
const getAllUsers = require('../controllers/user/getAllUsers.controller.js');
const getUserInfo = require('../controllers/user/getUserInfo.controller.js');
const deleteUserInfo = require('../controllers/user/deleteUserInfo.controller.js');

// register user
router.route('/users/register').post(registerUser);
// login user
router.route('/users/login').post(loginUser);

// get all users
router.route('/users').get(getAllUsers);

// get single user info
router.route('/users/:userId').get(getUserInfo);
// delete single user info
router.route('/users/:userId').delete(deleteUserInfo);

module.exports = router;
