const { z } = require('zod');
const { asyncHandler } = require('../../../utils/asyncHandler.js');
const { ApiResponse } = require('../../../utils/ApiResponse.js');
const { Todo } = require('../../models/todo.models.js');
const CustomError = require('../../../utils/Error.js');

const addTodo = asyncHandler(async (req, res, next) => {
  const schema = z.object({
    title: z
      .string({ message: 'Title is required' })
      .min(2, 'Title must be at least 2 characters'),
    isComplete: z.boolean().optional(),
  });

  const validation = schema.safeParse(req.body);

  if (!validation.success) {
    const error = CustomError.badRequest({
      message: 'Validation Error',
      errors: validation.error.errors.map((err) => err.message),
      hints: 'Please provide all the required fields',
    });

    return next(error);
  }

  // create todo object - create entry in DB
  const todo = await Todo.create(validation.data);

  // return response
  return res.status(201).json(
    new ApiResponse(
      201,
      {
        ...todo._doc,
        links: {
          self: '/todos',
          get: `/todos/${todo._id}`,
          update: `/todos/${todo._id}`,
          delete: `/todos/${todo._id}`,
        },
      },
      'Todo Added Successfully'
    )
  );
});

module.exports = addTodo;
