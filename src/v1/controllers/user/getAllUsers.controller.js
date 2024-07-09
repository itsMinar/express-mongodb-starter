const { asyncHandler } = require('../../../utils/asyncHandler.js');
const { ApiResponse } = require('../../../utils/ApiResponse.js');
const { User } = require('../../models/user.models.js');

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  // return response
  return res.status(200).json(
    new ApiResponse(200, users, 'All Users Info Fetched Successfully', {
      links: {
        self: req.url,
      },
    })
  );
});

module.exports = getAllUsers;
