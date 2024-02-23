const { asyncHandler } = require('../utils/asyncHandler');

const name = asyncHandler(async (req, _res, next) => {
  next();
});

module.exports = { name };
