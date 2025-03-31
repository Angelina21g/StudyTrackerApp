# StudyTracker

# Project Overview
StudyTracker is a simple backend app built for my Web Engineering class. The goal is to help students (like me) stay organized with their study tasks. It allows users to create an account, log in, and manage tasks like homework or study goals. Each task can include a due date, tags (like "math" or "reading"), and a priority level.

This project is focused on building the backend. It uses Node.js, Express, MongoDB, and JWT for authentication.

# What’s Working Right Now

MongoDB connected using Mongoose

User can register and log in (with password hashing and JWT)

Auth middleware protects routes so only logged-in users can manage tasks

Full CRUD for tasks (create, read, update, delete)

Tasks support tags, priorities, and due dates

Routes include filtering, sorting, and ownership checks

Helpful error and success messages

.env file for sensitive info

nodemon setup for development

# Routes

**Auth**
POST /auth/register — Register a new user

POST /auth/login — Log in and get a JWT token

**Tasks (JWT required)**
GET /tasks — Get user’s tasks (can filter by priority, completion, etc.)

POST /tasks — Create a new task

PUT /tasks/:id — Update an existing task

DELETE /tasks/:id — Delete a task

# How to Run the Project
Clone the repo:
git clone https://github.com/Angelina21g/StudyTrackerApp.git
cd study-tracker

# Install all packages:
npm install

# Create a .env file and add:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000

# Start the app in dev mode:
npm run dev

# Current Limitations
No frontend yet — all testing is done through Postman

You must include a token in the Authorization header to use the task routes

# Next Steps for Final Project 
Add a status field to tasks (e.g., "pending", "in progress", "completed")

Add backend logic to flag/filter tasks that are overdue (based on current date)

Create a new route like /dashboard that returns basic task stats (total, completed, overdue)

Add batch task completion (e.g., update multiple task IDs at once)

Add a route for updating user info (like password or username)

# Frontend Plans (For Later)
Eventually, I’d like to add a simple HTML interface so users can manage tasks without Postman.

