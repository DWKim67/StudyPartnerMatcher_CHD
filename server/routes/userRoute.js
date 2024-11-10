const express = require('express');
const {
  signupUser,
  loginUser,
  getAllUsers,
  getUserById,
  removeUser,
  updateUser
} = require('../controllers/userController');

// const requireAuth = require('../middleware/requireAuth.js') 

const router = express.Router();

// Require auth for all user actions
// router.use(requireAuth);

// Define routes for user operations

// Signup route
router.post('/signup', signupUser);

// Login route
router.post('/login', loginUser);

// Get all users
router.get('/', getAllUsers);

// Get a single user by ID
router.get('/:id', getUserById);

// Remove a user by ID
router.delete('/:id', removeUser);

// Update user info
router.patch('/:id', updateUser);

module.exports = router;
