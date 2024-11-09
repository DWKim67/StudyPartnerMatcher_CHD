const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Enable CORS for all origins
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());


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

// Define the port to use (should match the previous `port` definition)
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
