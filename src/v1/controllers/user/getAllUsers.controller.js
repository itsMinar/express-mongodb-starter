const { ApiError } = require('../../../utils/ApiError.js');
const { ApiResponse } = require('../../../utils/ApiResponse.js');
const { asyncHandler } = require('../../../utils/asyncHandler.js');
const { User } = require('../../models/user.models.js');

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();

    // return response
    return res
      .status(200)
      .json(new ApiResponse(200, users, 'All Users Info Fetched Successfully'));
  } catch (error) {
    throw new ApiError(500, 'Something went wrong while registering the user');
  }
});

module.exports = getAllUsers;
