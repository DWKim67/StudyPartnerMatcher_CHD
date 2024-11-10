// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');
const userRoutes = require('./routes/userRoute');
const courseRoutes = require('./routes/courseRoute');
const User = require('./models/userModel');
const Course = require('./models/courseModel'); // Ensure you import your Course model

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Enable CORS for all origins
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Initialize OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Route to fetch and sort students by compatibility score for a given course
app.post('/api/students-by-course', async (req, res) => {
  const { courseCode, referenceStudentId } = req.body;

  if (!courseCode || !referenceStudentId) {
    return res.status(400).json({ message: 'Both courseCode and referenceStudentId are required.' });
  }

  try {
    // Find the course by courseCode
    const course = await Course.findOne({ courseCode }).populate('students');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Find the reference student in the database
    const referenceStudent = await User.findById(referenceStudentId);
    if (!referenceStudent) {
      return res.status(404).json({ message: 'Reference student not found' });
    }

    // Helper function to find the overlapping interval
    function findOverlap(intervals1, intervals2) {
      for (const interval1 of intervals1) {
        for (const interval2 of intervals2) {
          const start = new Date(Math.max(interval1.start, interval2.start));
          const end = new Date(Math.min(interval1.end, interval2.end));
          if (start < end) { // valid overlap
            return { start, end };
          }
        }
      }
      return null; // No overlap found
    }

    // Calculate compatibility scores and find common time intervals for each student
    const studentScores = await Promise.all(
      course.students
        .filter(student => student._id.toString() !== referenceStudent._id.toString()) // Exclude the reference student
        .map(async (student) => {
          // Find common time interval
          const commonInterval = findOverlap(referenceStudent.timeIntervals, student.timeIntervals);
          if (!commonInterval) return null; // Skip this student if no common interval

          // Construct compatibility prompt
          const prompt = `Assess the compatibility between the following two users and return a score out of 10000.
          Add random fluctuation to the result so the result will not be round.
          Return only the number. Return nothing else.
          User 1: ${referenceStudent.studyHabits}
          User 2: ${student.studyHabits}`;

          const userName = student.userName;
          const studyHabits = student.studyHabits;

          // Call OpenAI API for compatibility scoring
          const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }],
          });
          console.log(`GPT response for student ${student.userName} ${response.choices[0].message.content}`);

          // Parse score and associate with the student and common interval
          const score = parseInt(response.choices[0].message.content, 10);
          return { userName, studyHabits, score, commonInterval };
        })
    );

    // Filter out null values from students without a common interval
    const validStudentScores = studentScores.filter(scoreData => scoreData !== null);

    // Sort students by compatibility score in descending order
    validStudentScores.sort((a, b) => b.score - a.score);

    // Limit to 5 students if there are more than 5
    const limitedStudentScores = validStudentScores.slice(0, 5);

    // Return sorted and limited list of students with their scores and common intervals
    console.log(`userName: ${referenceStudent.userName}\nstudyHabit: ${referenceStudent.studyHabits}\ntimeIntervals: ${referenceStudent.timeIntervals}`)

    res.json(limitedStudentScores);
  } catch (error) {
    console.error('Error fetching and sorting students:', error);
    res.status(500).json({ message: 'Error fetching and sorting students.', error: error.message });
  }
});


// Define routes and other configurations
app.use('/api/user', userRoutes);
app.use('/api/course', courseRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// Start server
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
