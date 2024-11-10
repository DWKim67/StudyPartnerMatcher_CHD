const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./userModel');

// Course Schema
const courseSchema = new Schema({
  courseName: {
    type: String,
    required: true
  },
  courseCode: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

// Create the Course model
const Course = mongoose.model('Course', courseSchema);
module.exports = Course;