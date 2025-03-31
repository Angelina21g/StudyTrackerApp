import express from 'express'; // Import Express to create routes
import bcrypt from 'bcryptjs';// Import bcrypt to hash passwords securely
import jwt from 'jsonwebtoken';// Import JWT to generate login tokens
import User from '../models/User.js';// Import the User model

// Create an Express router
const router = express.Router();

// REGISTER Route
// This allows a new user to create an account
router.post('/register', async (req, res) => {
  const { username, password } = req.body; // Get data from request

  try {
    // Hash the password so it’s not stored in plain text
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save(); // Save the user to the database

    res.status(201).json({ message: 'User registered!' }); // Success
  } catch (err) {
    res.status(400).json({ message: err.message }); // Error handling
  }
});

// LOGIN Route
// This allows a user to log in and receive a token
router.post('/login', async (req, res) => {
  const { username, password } = req.body; // Get login data

  try {
    // Look for a user with the provided username
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Compare entered password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // If password is correct, create a JWT token
    const token = jwt.sign(
      { userId: user._id },   // Payload: user ID
      process.env.JWT_SECRET, // Secret key from .env
      { expiresIn: '1d' }     // Token expires in 1 day
    );

    // Return the token to the user
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message }); // Server error
  }
});

// Export the router so it can be used in server.js
export default router;
