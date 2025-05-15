
import mongoose from 'mongoose';

// Define the structure of a "task" in the database
const taskSchema = new mongoose.Schema({
  // Title of the study task
  title:     { type: String, required: true },

  // Subject the task is related to
  subject:   { type: String, required: true },

  // Optional deadline for the task
  dueDate:   { type: Date,   default: null },

  // Optional scheduled start time for the study session
  startTime: { type: Date,   default: null },

  // Optional scheduled end time for the study session
  endTime:   { type: Date,   default: null },

  // The owner of this task; links to the User who created it
  user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // Priority level to help sort tasks
  priority:  {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  }
}, {
  // Automatically add createdAt and updatedAt timestamps
  timestamps: true
});

// Register and export the Task model for use in controllers and routes
export default mongoose.model('Task', taskSchema);
