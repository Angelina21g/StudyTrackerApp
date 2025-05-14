

import express from 'express';
import { check, validationResult } from 'express-validator';
import { register, login, getMe } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// helper to return validation errors
const runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

// Public routes

// POST /api/auth/register
// Validate username, email, and password before registering
router.post(
  '/register',
  [
    check('username', 'Username is required').notEmpty(),
    check('email',    'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
  ],
  runValidation,
  register
);

// POST /api/auth/login
// Allow login with either username or email, plus password
router.post(
  '/login',
  [
    // at least one of username or email must be provided
    check(['username','email'], 'Username or email is required').custom((_, { req }) => {
      if (!req.body.username && !req.body.email) {
        throw new Error('Provide a username or email');
      }
      return true;
    }),
    check('password', 'Password is required').exists()
  ],
  runValidation,
  login
);

// Private route

// GET /api/auth/me
// Return the current user's profile
router.get('/me', authMiddleware, getMe);

export default router;
