// Import mongoose to interact with MongoDB
import mongoose from 'mongoose';

// Define the structure of a "task" in the database
const taskSchema = new mongoose.Schema({
    
  // Title of the study task (required)
  title: { type: String, required: true },

  // Subject the task is related to (required)
  subject: { type: String, required: true },

  // Optional due date for the task
  dueDate: { type: Date },

  // Whether the task is completed or not (defaults to false)
  completed: { type: Boolean, default: false },

  //  ID of the user who created the task (required)
  // This links the task to the specific logged-in user
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  //  Tags for the task (optional)
  // An array of keywords/categories like "math", "essay", "reading"
  tags: {
    type: [String], // Accepts an array of strings
    default: []  // Defaults to an empty array
  },

  // Priority level of the task (Low, Medium, or High)
  // Helps users manage tasks by importance
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  }
}, {
  // Automatically adds createdAt and updatedAt timestamps
  timestamps: true
});

// Export the model so it can be used in other files (like routes)
const Task = mongoose.model('Task', taskSchema);
export default Task;
