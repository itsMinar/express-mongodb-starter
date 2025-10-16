const mongoose = require('mongoose');
const { DB_NAME } = require('../constants/db');
const logger = require('../logger/winston.logger');
const { MONGODB_URI } = require('../config/env');

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(MONGODB_URI, {
      dbName: DB_NAME,
    });

    logger.info(
      `☘️  MongoDB Connected! DB HOST: ${connectionInstance.connection.host}`
    );

    return connectionInstance;
  } catch (error) {
    logger.error('MongoDB connection error', error);
    throw error;
  }
};

const disconnectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    return;
  }

  await mongoose.connection.close();
  logger.info('MongoDB connection closed');
};

module.exports = { connectDB, disconnectDB };
