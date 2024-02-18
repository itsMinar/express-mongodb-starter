const mongoose = require('mongoose');
const { DB_NAME } = require('../constants');

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: DB_NAME,
    });

    console.log(
      `\n☘️  MongoDB Connected! DB HOST: ${connectionInstance.connection.host}\n`
    );
  } catch (error) {
    console.log('MongoDB Connection Error: ', error);
    process.exit(1);
  }
};

module.exports = connectDB;
