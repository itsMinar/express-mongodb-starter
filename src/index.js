require('dotenv').config();

const { httpServer } = require('./app');
const { PORT } = require('./config/env');
const { connectDB, disconnectDB } = require('./db');
const logger = require('./logger/winston.logger');

const startServer = async () => {
  try {
    await connectDB();

    httpServer.listen(PORT, () => {
      logger.info(`⚙️  Server is running on PORT: ${PORT} 🚀`);
    });
  } catch (error) {
    logger.error('Failed to start server', error);
    process.exit(1);
  }
};

startServer();

const gracefulShutdown = (signal) => {
  logger.warn(`${signal} received. Shutting down gracefully.`);

  httpServer.close(async (closeError) => {
    if (closeError) {
      logger.error('Error while closing HTTP server', closeError);
      process.exit(1);
    }

    try {
      await disconnectDB();
      logger.info('Database connection closed.');
      process.exit(0);
    } catch (dbError) {
      logger.error('Error while disconnecting from database', dbError);
      process.exit(1);
    }
  });

  setTimeout(() => {
    logger.error('Forcing shutdown after timeout.');
    process.exit(1);
  }, 10000).unref();
};

['SIGINT', 'SIGTERM'].forEach((signal) => {
  process.on(signal, () => gracefulShutdown(signal));
});

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled promise rejection detected', reason);
  throw reason;
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught exception detected', error);
  process.exit(1);
});
