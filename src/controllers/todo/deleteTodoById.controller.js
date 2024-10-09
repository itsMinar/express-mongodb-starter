const { isValidObjectId } = require('mongoose');
const { asyncHandler } = require('../../utils/asyncHandler.js');
const { ApiResponse } = require('../../utils/ApiResponse.js');
const { Todo } = require('../../models/todo.model.js');
const CustomError = require('../../utils/Error.js');

const deleteTodoById = asyncHandler(async (req, res, next) => {
  const { todoId } = req.params;

  if (!isValidObjectId(todoId)) {
    const error = CustomError.badRequest({
      message: 'Invalid Todo ID',
      errors: ['The provided Todo ID is not valid.'],
      hints: 'Please ensure that the Todo ID is correct and try again.',
    });

    return next(error);
  }

  const deletedTodo = await Todo.findByIdAndDelete(todoId);

  if (!deletedTodo) {
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
        title: deletedTodo.title,
        links: {
          self: `/todos/${deletedTodo._id}`,
          getAllTodos: '/todos',
        },
      },
      'Todo Deleted Successfully'
    )
  );
});

module.exports = deleteTodoById;
