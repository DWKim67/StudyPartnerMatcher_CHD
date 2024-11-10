const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./userModel');

// Course Schema
const courseSchema = new Schema({
  courseCode: {
    type: String,
    required: true,
    unique: true,
    trim: true,
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
