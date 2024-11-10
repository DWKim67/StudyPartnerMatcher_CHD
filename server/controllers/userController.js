const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

// Signup user
const signupUser = async (req, res) => {
  const { userName, password } = req.body

  try {
    const user = await User.signup(userName, password);

    // Create a token
    const token = createToken(user._id);

    res.status(200).json({ userName, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

}

// Login user
const loginUser = async (req, res) => {
  const { userName, password } = req.body

  try {
    const user = await User.login(userName, password);

    // Create a token
    const token = createToken(user._id);

    // Send the response with user data and token
    res.status(200).json({
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      courses: user.courses,
      timeIntervals: user.timeIntervals,
      token
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}); // Fetch all students
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).populate('courses'); // Populate courses if needed
    if (!user) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove a user by ID
const removeUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User removed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update user info
const updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;  // Contains fields to update (e.g., firstName, lastName, etc.)

  try {
    const user = await User.findByIdAndUpdate(id, updates, { new: true }).populate('courses');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  signupUser,
  loginUser,
  getAllUsers,
  getUserById,
  removeUser,
  updateUser
}