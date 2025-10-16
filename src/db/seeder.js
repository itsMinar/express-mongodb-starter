require('dotenv').config();

const { connectDB, disconnectDB } = require('.');
const logger = require('../logger/winston.logger');
const { Todo } = require('../models/todo.model');

(async () => {
  try {
    await connectDB();

    await Todo.deleteMany({});
    await Todo.insertMany([
      { title: 'Buy groceries' },
      { title: 'Read a book', isComplete: true },
    ]);

    logger.info('Database seeded successfully!');
  } catch (error) {
    logger.error('Database seeding failed', error);
    process.exitCode = 1;
  } finally {
    await disconnectDB();
  }
})();
