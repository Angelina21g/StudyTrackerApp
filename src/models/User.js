

import mongoose from 'mongoose';

// Define the structure of a "user" in the database
const userSchema = new mongoose.Schema({
  // The user's chosen username (must be unique and required)
  username: {
    type: String,
    required: true,
    unique: true
  },

  // The user's email address (must be unique and required)
  email: {
    type: String,
    required: true,
    unique: true
  },

  // The user's password (required)
  // This will be hashed before being saved to the database
  password: {
    type: String,
    required: true
  }
}, {
  // Automatically add createdAt and updatedAt timestamps
  timestamps: true
});

// Export the model so we can use it in routes and controllers
export default mongoose.model('User', userSchema);
