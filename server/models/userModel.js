const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { unique } = require('next/dist/build/utils');

// Import the Course model
const Course = require('./courseModel');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  // Required!: userName, userID, password
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // profileImage: {
  //   type: Buffer,
  //   required: true,
  // },

  // Not required
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,  // Add sparse index to allow multiple nulls
    trim: true,
    lowercase: true,
    match: [/^.+@.+\..+$/, 'Please enter a valid email address']
  },

  // Or do `courses: [courseSchema],`
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  }],

  timeIntervals: [{
    start: {
      type: Date,  // Start time as a Date object
    },
    end: {
      type: Date,  // End time as a Date object
    }
  }],

  studyHabits: {
    type: String,
  }
})


// Static signup method
userSchema.statics.signup = async function (userName, password) {

  // Validation
  if (!userName || !password) {
    throw Error('All fields must be filled');
  }

  // if (!validator.isStrongPassword(password)) {
  //   throw Error("Password not strong enough")
  // }

  const existsUserName = await this.findOne({ userName });


  if (existsUserName) {
    throw new Error("userName already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ userName, password: hash });

  return user;
};

// Static login method
userSchema.statics.login = async function (userName, password) {
  // Validation
  if (!userName || !password) {
    throw Error('All fields must be filled');
  }

  const user = await this.findOne({ userName }).populate('courses');

  if (!user) {
    throw new Error("Incorrect userName");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error('Incorrect password');
  }

  return user

}

const User = mongoose.model('User', userSchema);
module.exports = User;