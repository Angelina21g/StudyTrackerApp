# StudyTracker

# Project Overview
StudyTracker is a simple full-stack study management app built for my Web Engineering class. It helps students stay organized by letting them create an account, log in, and manage tasks like homework or study goals. Each task includes a title, subject, due date, scheduled start/end times, and a priority level.

This project uses Node.js, Express, MongoDB (via Mongoose), JWT for auth on the backend, and plain HTML/CSS/vanilla JS on the frontend.


# What’s Working Right Now

**User Authentication**

Register & log in with bcrypt-hashed passwords

Receive a JWT and store it in localStorage

**Protected Routes**

All task APIs require a valid Bearer token

**Task Management (CRUD)**

Create new tasks with title, subject, due date, start/end times, priority

Read fetch your tasks and display them as cards

Update pre-fill the form for editing and save changes

Delete remove a task with confirmation

**Frontend**

Responsive dashboard (form + cards)

Inline form messages (success / error)

Native confirm() for delete

**Backend**

MVC structure: models/, controllers/, routes/, middleware/, config/db.js

Express-validator for input checks

Centralized error handling & logging (morgan)

**Development**

nodemon for hot reload

Environment variables with .env

Ready for Vercel deploy (vercel.json)

# Routes

**Auth**
POST /auth/register — Register a new user

POST /auth/login — Log in and get a JWT token

**Tasks (JWT required)**
GET /tasks — Get all your task

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

# Open in your browser:

Auth page → http://localhost:3000/index.html

Dashboard → redirects to http://localhost:3000/task.html after login

# Current Limitations
No batch filtering or sorting controls on the frontend

Uses native confirm() for delete rather than a custom modal

No automated tests (unit/integration) 
