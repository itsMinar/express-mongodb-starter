require('dotenv').config();

const { httpServer } = require('./app');
const { PORT } = require('./config/env');
const connectDB = require('./db');
const logger = require('./logger/winston.logger');

connectDB()
  .then(() => {
    httpServer.listen(PORT, () => {
      logger.info(`⚙️  Server is running on PORT: ${PORT} 🚀`);
    });
  })
  .catch((err) => {
    logger.error('MONGODB Connection Failed!!', err);
  });
