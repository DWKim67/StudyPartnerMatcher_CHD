const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

const signupUser = async (req, res) => {
  const { userName, password, profileImage } = req.body;
  // const profileImage = req.files?.profileImage;  // Capture profile image from request

  // Debugging logs
  console.log("Received userName:", userName);
  console.log("Received password:", password);
  console.log("Received profileImage:", profileImage);

  // Validation to ensure userName, password, and profileImage are provided
  if (!userName || !password || !profileImage) {
    return res.status(400).json({ error: 'All fields must be filled, including profileImage.' });
  }

  try {
    // If profile image is provided, capture and store it as a Buffer
    // const profileImageBuffer = profileImage.data; // Store image as a buffer
    const user = await User.signup(userName, password, profileImage);
    // console.log("After sign up")
    // Create a token
    const token = createToken(user._id);
    res.status(200).json({ userName, token });
  } catch (error) {
    console.error(error); // Log the error
    // res.status(400).json({ error: error.message });
    res.status(400).json({error: error.message});
  }
};


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
      profileImage: user.profileImage,
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
    const users = await User.find(); // Fetch all students
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
  // const profileImage = req.files?.profileImage;  // Optional: Capture profile image if provided

  try {
    let user = await User.findById(id).populate('courses');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Update user fields
    user = await User.findByIdAndUpdate(id, updates, { new: true }).populate('courses');

    // If profile image is provided, update it
    // if (profileImage) {
    //   user.profileImage = profileImage.data;  // Save binary data as Buffer
    //   await user.save();
    // }

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