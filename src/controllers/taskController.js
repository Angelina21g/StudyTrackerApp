

import dotenv from 'dotenv';          // load environment variables
import Task from '../models/Task.js'; // Task data model

dotenv.config();

// GET /api/tasks
// Return all tasks belonging to the logged-in user
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch tasks' });
  }
};

// POST /api/tasks
// Create a new task for the logged-in user
export const createTask = async (req, res) => {
  try {
    const {
      title,
      subject,
      dueDate = null,
      startTime = null,
      endTime = null,
      priority = 'Medium'
    } = req.body;

    const task = new Task({
      title,
      subject,
      dueDate,
      startTime,
      endTime,
      priority,
      userId: req.user.userId
    });

    await task.save();
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to create task' });
  }
};

// PUT /api/tasks/:id
// Update a task by ID if it belongs to the user
export const updateTask = async (req, res) => {
  try {
    const {
      title,
      subject,
      dueDate = null,
      startTime = null,
      endTime = null,
      priority = 'Medium'
    } = req.body;

    const updates = { title, subject, dueDate, startTime, endTime, priority };

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      updates,
      { new: true } // return the updated task
    );

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.json({ success: true, data: task });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to update task' });
  }
};

// DELETE /api/tasks/:id
// Remove a task by ID if it belongs to the user
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.json({ success: true, message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete task' });
  }
};
