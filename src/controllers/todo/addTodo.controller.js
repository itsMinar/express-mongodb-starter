const { asyncHandler } = require('../../utils/asyncHandler');
const CustomError = require('../../utils/Error');
const { Todo } = require('../../models/todo.model');
const { ApiResponse } = require('../../utils/ApiResponse');
const { addTodoSchema } = require('../../schemas/todo.schemas');

const addTodo = asyncHandler(async (req, res, next) => {
  const parsedBody = addTodoSchema.safeParse(req.body);

  if (!parsedBody.success) {
    const error = CustomError.badRequest({
      message: 'Validation Error',
      errors: parsedBody.error.errors.map((err) => err.message),
      hints: 'Please provide all the required fields',
    });

    return next(error);
  }

  // create todo object - create entry in DB
  const todo = await Todo.create(parsedBody.data);

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
