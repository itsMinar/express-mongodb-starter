const { Schema, model } = require('mongoose');

// create Todo schema
const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    isComplete: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// create Todo model
const Todo = model('Todo', todoSchema);

module.exports = { Todo };
