const { connect } = require('mongoose');
const { DB_NAME } = require('../constants/db');
const logger = require('../logger/winston.logger');

const connectDB = async () => {
  try {
    const connectionInstance = await connect(process.env.MONGODB_URI, {
      dbName: DB_NAME,
    });

    logger.info(
      `☘️  MongoDB Connected! DB HOST: ${connectionInstance.connection.host}\n`
    );
  } catch (error) {
    logger.error('MongoDB Connection Error: ', error);
    process.exit(1);
  }
};

module.exports = connectDB;
