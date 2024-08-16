const { isValidObjectId } = require('mongoose');
const { z } = require('zod');
const { asyncHandler } = require('../../../utils/asyncHandler.js');
const { ApiResponse } = require('../../../utils/ApiResponse.js');
const { Todo } = require('../../models/todo.models.js');
const CustomError = require('../../../utils/Error.js');

const updateTodoById = asyncHandler(async (req, res, next) => {
  const { todoId } = req.params;

  if (!isValidObjectId(todoId)) {
    const error = CustomError.badRequest({
      message: 'Invalid Todo ID',
      errors: ['The provided Todo ID is not valid.'],
      hints: 'Please ensure that the Todo ID is correct and try again.',
    });

    return next(error);
  }

  const schema = z.object({
    _id: z.string({ message: 'Todo ID is Required' }),
    title: z
      .string({ message: 'Title is required' })
      .min(2, 'Title must be at least 2 characters')
      .optional(),
    isComplete: z.boolean().optional(),
  });

  const validation = schema.safeParse({ _id: todoId, ...req.body });

  if (!validation.success) {
    const error = CustomError.badRequest({
      message: 'Validation Error',
      errors: validation.error.errors.map((err) => err.message),
      hints: 'Please provide all the required fields',
    });

    return next(error);
  }

  const updatedTodo = await Todo.findByIdAndUpdate(
    validation.data._id,
    {
      ...validation.data,
    },
    { new: true }
  );

  if (!updatedTodo) {
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
        ...updatedTodo._doc,
        links: {
          self: `/todos/${updatedTodo._id}`,
          get: `/todos/${updatedTodo._id}`,
          delete: `/todos/${updatedTodo._id}`,
        },
      },
      'Todo Info Updated Successfully'
    )
  );
});

module.exports = updateTodoById;
