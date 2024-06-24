const { Schema, model } = require('mongoose');

// create User schema
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, 'Password is Required'],
    },
  },
  {
    timestamps: true,
  }
);

// create User model
const User = model('User', userSchema);

module.exports = { User };
