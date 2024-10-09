const { isValidObjectId } = require('mongoose');
const { asyncHandler } = require('../../utils/asyncHandler.js');
const { ApiResponse } = require('../../utils/ApiResponse.js');
const { Todo } = require('../../models/todo.model.js');
const CustomError = require('../../utils/Error.js');

const getTodoById = asyncHandler(async (req, res, next) => {
  const { todoId } = req.params;

  if (!isValidObjectId(todoId)) {
    const error = CustomError.badRequest({
      message: 'Invalid Todo ID',
      errors: ['The provided Todo ID is not valid.'],
      hints: 'Please ensure that the Todo ID is correct and try again.',
    });

    return next(error);
  }

  const todo = await Todo.findById(todoId);

  if (!todo) {
    const error = CustomError.notFound({
      message: 'Todo not found',
      errors: ['The todo with the provided id does not exist'],
      hints: 'Please provide a valid todo id',
    });

    return next(error);
  }

  // return response
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        ...todo._doc,
        links: {
          self: `/todos/${todo._id}`,
          update: `/todos/${todo._id}`,
          delete: `/todos/${todo._id}`,
        },
      },
      'Todo Info fetched Successfully'
    )
  );
});

module.exports = getTodoById;
