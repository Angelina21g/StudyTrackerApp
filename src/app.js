
import express from 'express';
import cors from 'cors';         // Enable Cross Origin Resource Sharing
import morgan from 'morgan';     // HTTP request logging
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import path from 'path';

dotenv.config();

// 1. Connect to MongoDB
connectDB();

const app = express();

// 2. Middleware
app.use(express.json());    // parse JSON bodies
app.use(cors());
app.use(morgan('dev'));

// Serve all static frontend files (HTML, CSS, JS, images) from the FRONTEND directory
app.use(express.static(path.join(process.cwd(), 'frontend')));


// 3. Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// 4. Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error'
  });
});

export default app;
