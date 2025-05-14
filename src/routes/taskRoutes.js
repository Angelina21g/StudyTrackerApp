

import express from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect all task routes
router.use(authMiddleware);

/**
 * GET /api/tasks
 * Return all tasks for the authenticated user
 */
router.get('/', getTasks);

/**
 * POST /api/tasks
 * Create a new task
 */
router.post('/', createTask);

/**
 * PUT /api/tasks/:id
 * Update an existing task by its ID
 */
router.put('/:id', updateTask);

/**
 * DELETE /api/tasks/:id
 * Delete a task by its ID
 */
router.delete('/:id', deleteTask);

export default router;
