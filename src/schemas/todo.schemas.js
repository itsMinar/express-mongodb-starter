const { z } = require('zod');

const addTodoSchema = z.object({
  title: z
    .string({ message: 'Title is required' })
    .min(2, { message: 'Title must be at least 2 characters' }),
  isComplete: z.boolean().optional(),
});

const updateTodoSchema = addTodoSchema.partial();

module.exports = { addTodoSchema, updateTodoSchema };
