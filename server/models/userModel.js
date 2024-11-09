const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { unique } = require('next/dist/build/utils');

// Import the Course model
const Course = require('./courseModel');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  // Required: userName, userID, password
  userName: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },

  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },

  // Or do `courses: [courseSchema],`
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  }]
})

const User = mongoose.model('User', userSchema);
module.exports = User;