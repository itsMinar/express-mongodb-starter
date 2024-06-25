const { ApiError } = require('../../../utils/ApiError.js');
const { ApiResponse } = require('../../../utils/ApiResponse.js');
const { asyncHandler } = require('../../../utils/asyncHandler.js');
const { User } = require('../../models/user.models.js');

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  const { fullName, email, password } = req.body;

  // validation - not empty
  if ([fullName, email, password].some((field) => field?.trim() === '')) {
    throw new ApiError(400, 'All fields are required');
  }

  // check if user already exists: username, email
  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(409, 'User with email already exists');
  }

  // create user object - create entry in DB
  const user = await User.create({
    fullName,
    email,
    password,
  });

  // remove password field from response
  const createdUser = await User.findById(user._id).select('-password');

  // check for user creation
  if (!createdUser) {
    throw new ApiError(500, 'Something went wrong while registering the user');
  }

  // return response
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, 'User Registered Successfully'));
});

module.exports = registerUser;
