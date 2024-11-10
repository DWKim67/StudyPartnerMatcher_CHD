const Course = require('../models/courseModel');
const User = require('../models/userModel');

// Create a new course
const createCourse = async (req, res) => {
  const { courseCode } = req.body;

  if (!courseCode) {
    return res.status(400).json({ error: 'Course code is required.' });
  }

  try {
    const existingCourse = await Course.findOne({ courseCode });
    if (existingCourse) {
      return res.status(400).json({ error: 'Course with this code already exists.' });
    }

    const course = new Course({ courseCode });
    await course.save();

    res.status(201).json(course);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// Get all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('students');
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Get a single course by ID
const getCourseById = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findById(id).populate('students');
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Remove a course by ID
const removeCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Optionally, remove the course from all students enrolled in it
    await User.updateMany(
      { courses: id },
      { $pull: { courses: id } }
    );

    res.status(200).json({ message: 'Course removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Update course details
const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { courseCode } = req.body;

  try {
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Update course details
    if (courseCode) course.courseCode = courseCode;

    await course.save();

    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Add student to a course
const addStudentToCourse = async (req, res) => {
  const { courseID, userID } = req.body;

  try {
    const course = await Course.findById(courseID);
    const user = await User.findById(userID);

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Add user to the course's students list
    if (!course.students.includes(userID)) {
      course.students.push(userID);
      await course.save();

      // Add the course to the user's list of courses
      user.courses.push(courseID);
      await user.save();

      res.status(200).json({ message: 'Student added to course successfully' });
    } else {
      res.status(400).json({ error: 'Student is already enrolled in this course' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Remove student from a course
const removeStudentFromCourse = async (req, res) => {
  const { courseID, userID } = req.body;

  try {
    const course = await Course.findById(courseID);
    const user = await User.findById(userID);

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Remove user from the course's students list
    course.students = course.students.filter(studentId => studentId.toString() !== userID);
    await course.save();

    // Remove the course from the user's list of courses
    user.courses = user.courses.filter(courseID => courseID.toString() !== courseID);
    await user.save();

    res.status(200).json({ message: 'Student removed from course successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  removeCourse,
  updateCourse,
  addStudentToCourse,
  removeStudentFromCourse
};
