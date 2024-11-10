const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Create a new course
router.post('/', courseController.createCourse);

// Get all courses
router.get('/', courseController.getAllCourses);

// Get a single course by ID
router.get('/:id', courseController.getCourseById);

// Remove a course by ID
router.delete('/:id', courseController.removeCourse);

// Update course details
router.put('/:id', courseController.updateCourse);

// Add a student to a course
router.post('/addStudent', courseController.addStudentToCourse);

// Remove a student from a course
router.post('/removeStudent', courseController.removeStudentFromCourse);

module.exports = router;
