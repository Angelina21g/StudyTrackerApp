// Import required modules
import express from 'express';   // Web framework to build the API
import mongoose from 'mongoose';    // MongoDB library to connect to the database
import dotenv from 'dotenv';    // Loads environment variables from .env
import taskRoutes from './routes/taskRoutes.js'; // Imports the task routes 
import authRoutes from './routes/authRoutes.js'; // Imports the authentication routes

// Load environment variables (like MongoDB URI and port)
dotenv.config();

// Create an Express app
const app = express();

// MIDDLEWARE
// This allows the app to read JSON data sent in the request body
app.use(express.json());

// Route to handle user registration and login
app.use('/auth', authRoutes);

// Route to handle task-related endpoints
app.use('/tasks', taskRoutes);

// DATABASE CONNECTION
// Connect to MongoDB using the URI in the .env file
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('DB connection error:', err));

// START THE SERVER
// Use port 3000 or any port specified in the .env file
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
