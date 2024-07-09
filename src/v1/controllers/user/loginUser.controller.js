const { asyncHandler } = require('../../../utils/asyncHandler.js');
const { ApiResponse } = require('../../../utils/ApiResponse.js');
const { ApiError } = require('../../../utils/ApiError.js');
const { User } = require('../../models/user.models.js');

const loginUser = asyncHandler(async (req, res) => {
  // get user details from client
  const { email, password } = req.body;

  // validation - not empty
  if ([email, password].some((field) => field?.trim() === '')) {
    throw new ApiError(400, 'All fields are required');
  }

  // Find user with the given email address
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, 'User not Found!');
  }

  // return response
  return res.status(201).json(
    new ApiResponse(201, user, 'User Info fetched Successfully', {
      links: {
        self: req.url,
      },
    })
  );
});

module.exports = loginUser;
