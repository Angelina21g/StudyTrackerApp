

import bcrypt from 'bcryptjs';        // password hashing
import jwt from 'jsonwebtoken';       // token creation
import dotenv from 'dotenv';          // load .env vars
import User from '../models/User.js'; // user schema

dotenv.config();

// Make a JWT for a user
const generateToken = (user) =>
  jwt.sign(
    { userId: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

// Register a new user
export const register = async (req, res) => {
  try {
    // check for existing username or email
    const existing = await User.findOne({
      $or: [
        { username: req.body.username },
        { email: req.body.email }
      ]
    });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Username or email already in use' });
    }

    // hash password
    const hashed = await bcrypt.hash(req.body.password, 10);

    // save user
    const user = new User({
      username: req.body.username,
      email:    req.body.email,
      password: hashed,
    });
    await user.save();

    // send back token
    const token = generateToken(user);
    res.status(201).json({ success: true, data: { token } });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Log in an existing user
export const login = async (req, res) => {
  try {
    // find user by username or email
    const user = await User.findOne({
      $or: [
        { username: req.body.username },
        { email:    req.body.email }
      ]
    });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // check password
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // send back token
    const token = generateToken(user);
    res.json({ success: true, data: { token } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get current user profile
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
