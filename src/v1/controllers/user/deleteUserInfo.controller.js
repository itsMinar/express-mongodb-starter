const { asyncHandler } = require('../../../utils/asyncHandler.js');
const { ApiResponse } = require('../../../utils/ApiResponse.js');
const { ApiError } = require('../../../utils/ApiError.js');
const { User } = require('../../models/user.models.js');

const deleteUserInfo = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, 'User not Found!');
  }

  await user.deleteOne();

  // return response
  return res.status(200).json(
    new ApiResponse(200, null, 'User Info Deleted Successfully', {
      links: {
        self: req.url,
      },
    })
  );
});

module.exports = deleteUserInfo;
