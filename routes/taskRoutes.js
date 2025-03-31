// Import Express to use its Router features
import express from 'express';

// Import the Task model to interact with the MongoDB database
import Task from '../models/Task.js'; 

// Import the authentication middleware
import authMiddleware from '../middleware/authMiddleware.js';

// Create a router object to handle task routes
const router = express.Router();

// Apply JWT auth middleware to protect all task routes
router.use(authMiddleware);

// 🟢 GET all tasks
// This route shows a list of all tasks in the database
// Only shows tasks that belong to the logged-in user
// Filters by completion and sorting by fields like dueDate
router.get('/', async (req, res) => {
  try {
    //  Base filter: only fetch tasks that belong to the logged-in user
    const filter = { userId: req.user.userId };

    // Optional filter: completed status
    if (req.query.completed !== undefined) {
      filter.completed = req.query.completed === 'true';
    }

    // Optional filter: priority level (Low, Medium, High)
    if (req.query.priority) {
      filter.priority = req.query.priority;
    }

    // Optional sorting: sort=dueDate, sort=createdAt, etc.
    const sortField = req.query.sort || 'createdAt';

    // Fetch and return filtered + sorted tasks
    const tasks = await Task.find(filter).sort({ [sortField]: 1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message }); // Internal Server Error
  }
});

// 🟡 POST a new task
// This route allows the user to add a new task (e.g., homework or study goal)
router.post('/', async (req, res) => {
  const { title, subject, dueDate, priority, tags } = req.body; // Get task data from client

  // Input validation
  if (!title || !subject) {
    return res.status(400).json({ message: 'Title and subject are required.' });
  }

  if (dueDate && isNaN(Date.parse(dueDate))) {
    return res.status(400).json({ message: 'Invalid date format for dueDate.' });
  }

  // Validate priority (optional but must be one of the allowed values)
  const allowedPriorities = ['Low', 'Medium', 'High'];
  if (priority && !allowedPriorities.includes(priority)) {
    return res.status(400).json({ message: 'Priority must be Low, Medium, or High.' });
  }

  //  Validate tags (optional)
  // Must be an array if provided — even a single tag like "math" must be sent as ["math"]
  if (tags && !Array.isArray(tags)) {
    return res.status(400).json({
      message: 'Tags must be provided as a list, e.g. ["math"]'
    });
  }

  // Attach the logged-in user's ID to the new task
  const task = new Task({
    title,
    subject,
    dueDate,
    priority,
    tags,
    userId: req.user.userId
  });

  try {
    const newTask = await task.save(); // Save task to database
    res.status(201).json({
      message: 'Task created successfully!',
      task: newTask
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create task. Please try again.' });
  }
});

// 🟠 PUT (update) a task by ID
// This route allows the user to update an existing task
// It also ensures the task belongs to the logged-in user
router.put('/:id', async (req, res) => {
  const { title, subject, dueDate, priority, tags } = req.body;

  // Optional input validation for fields
  if (title === '') {
    return res.status(400).json({ message: 'Title cannot be empty.' });
  }
  if (subject === '') {
    return res.status(400).json({ message: 'Subject cannot be empty.' });
  }
  if (dueDate && isNaN(Date.parse(dueDate))) {
    return res.status(400).json({ message: 'Invalid date format for dueDate.' });
  }

  // Validate priority if updated
  const allowedPriorities = ['Low', 'Medium', 'High'];
  if (priority && !allowedPriorities.includes(priority)) {
    return res.status(400).json({ message: 'Priority must be Low, Medium, or High.' });
  }

  // Validate tags if provided
  // Must be an array even for one tag
  if (tags && !Array.isArray(tags)) {
    return res.status(400).json({
      message: 'Tags must be provided as a list, e.g. ["math"]'
    });
  }

  try {
    //  Only update the task if it belongs to the user
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found or not authorized.' });
    }

    res.json({
      message: 'Task updated successfully!',
      task
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update task. Please try again.' });
  }
});

// 🔴 DELETE a task by ID
// This route allows the user to delete a task
// It also checks if the task belongs to the logged-in user
router.delete('/:id', async (req, res) => {
  try {
    // Only delete the task if it belongs to the user
    const deleted = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Task not found or not authorized.' });
    }

    res.json({
      message: 'Task deleted successfully!',
      task: deleted
    });
  } catch (err) {
    res.status(500).json({ message: err.message }); // Internal Server Error
  }
});

// Export the router so it can be used in server.js
export default router;
