const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');
const userRoutes = require('./routes/userRoute');
const fileUpload = require('express-fileupload');
const courseRoutes = require('./routes/courseRoutes');
const User = require('./models/userModel');


dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Enable CORS for all origins
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// app.use(fileUpload());

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });



// Test route to verify server is working
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// Example of a simple API route
app.get('/api/test', (req, res) => {
  res.json({ message: 'This is a test response from the server.' });
});

// Use the user routes
app.use('/api/user', userRoutes);

// Use the course routes
app.use('/api/courses', courseRoutes);

// Initialize OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure you set the OpenAI key in your .env file
});

// OpenAI text generation endpoint for compatibility scoring
app.post('/api/generate-text', async (req, res) => {
  const { user1_id, user2_id } = req.body; // Get the user IDs from the request body

  if (!user1_id || !user2_id) {
    return res.status(400).json({ message: 'Both user IDs are required.' });
  }

  try {
    // Retrieve the profiles of both users from the database
    const user1 = await User.findById(user1_id);
    const user2 = await User.findById(user2_id);

    if (!user1 || !user2) {
      return res.status(404).json({ message: 'One or both users not found.' });
    }

    // Create the prompts from the profiles
    const prompt1 = "I prefer quiet environments and study groups. I like someone keeping me in check and hate it if people are too talkative"; // Example: "User 1 prefers quiet environments and study groups."
    const prompt2 = "I like active group discussions and want someone who can talk with me and figure out things together."; // Example: "User 2 likes active group discussions."

    // Construct the compatibility assessment prompt
    const prompt = `Assess the compatibilities of the following two users and give me a compatibility score out of 100. RETURN JUST THE SCORE INTEGER OUT OF 100.
    User 1: ${prompt1} 
    User 2: ${prompt2}`;

    // Call OpenAI API to generate text
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',  // You can use other models like 'gpt-4'
      messages: [{ role: 'user', content: prompt }],
    });

    // Send the response from OpenAI API back to the client
    res.json({ text: response.choices[0].message.content });
  } catch (error) {
    console.error('Error generating text:', error);
    res.status(500).json({ message: 'Error generating text.', error: error.message });
  }
});

// Define a User schema for Mongoose (adjust as needed based on your actual schema)
// const userSchema = new mongoose.Schema({
//   name: String,
//   profileText: String, // Profile text field for user preferences
//   // Additional fields can be added as necessary
// });

// Define the port to use (should match the previous `port` definition)
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
