require('dotenv').config();

const app = require('./app');
const { PORT } = require('./config/env');
const connectDB = require('./db');
const logger = require('./logger/winston.logger');

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`⚙️  Server is running on PORT: ${PORT} 🚀`);
    });
  })
  .catch((err) => {
    logger.error('MONGODB Connection Failed!!', err);
  });
