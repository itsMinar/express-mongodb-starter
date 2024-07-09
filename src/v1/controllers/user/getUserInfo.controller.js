const { asyncHandler } = require('../../../utils/asyncHandler.js');
const { ApiResponse } = require('../../../utils/ApiResponse.js');
const { ApiError } = require('../../../utils/ApiError.js');
const { User } = require('../../models/user.models.js');

const getUserInfo = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const userInfo = await User.findById(userId);

  if (!userInfo) {
    throw new ApiError(404, 'User not Found!');
  }

  // return response
  return res.status(200).json(
    new ApiResponse(200, userInfo, 'User Info Fetched Successfully', {
      links: {
        self: req.url,
      },
    })
  );
});

module.exports = getUserInfo;
