const { asyncHandler } = require('../../../utils/asyncHandler.js');
const { ApiResponse } = require('../../../utils/ApiResponse.js');
const { Todo } = require('../../models/todo.models.js');

const getAllTodos = asyncHandler(async (req, res, next) => {
  const todos = await Todo.find();

  // return response
  return res
    .status(200)
    .json(new ApiResponse(200, todos, 'All Todos  fetched Successfully'));
});

module.exports = getAllTodos;
