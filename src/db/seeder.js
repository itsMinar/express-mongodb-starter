require('dotenv').config();

const connectDB = require('.');
const logger = require('../logger/winston.logger');
const { Todo } = require('../models/todo.model');

connectDB()
  .then(async () => {
    // Clear the collection before seeding
    await Todo.deleteMany({});

    // Insert dummy data into the database
    await Todo.insertMany([
      { title: 'Buy groceries' },
      { title: 'Read a book', isComplete: true },
    ]);

    logger.info('Database seeded successfully!');
    // Exit the process after seeding
    process.exit();
  })
  .catch((err) => {
    logger.error('MONGODB Connection Failed!!', err);
    // Exit with failure
    process.exit(1);
  });
