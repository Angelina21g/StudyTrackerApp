// Import mongoose to define a schema and interact with MongoDB
import mongoose from 'mongoose';

// Define the structure of a "user" in the database
const userSchema = new mongoose.Schema({
  // The user's chosen username (must be unique and required)
  username: {
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
});

// Create a model from the schema
// "User" is the name of the collection in MongoDB
const User = mongoose.model('User', userSchema);

// Export the model so we can use it in routes and controllers
export default User;
