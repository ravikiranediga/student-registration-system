# Student Registration System

A full-stack student registration system with Angular frontend and Node.js/Express backend with MongoDB database.

## Project Structure

```
MONGODATABASE/
├── backend/                 # Node.js Express API
│   ├── models/             # Mongoose schemas
│   │   └── Student.js      # Student model
│   ├── routes/            # Express routes
│   │   └── studentRoutes.js
│   ├── middleware/        # Custom middleware
│   │   └── validation.js   # Input validation & sanitization
│   ├── server.js          # Main server file
│   ├── package.json
│   └── .env               # Environment variables
│
└── frontend/              # Angular Application
    ├── src/
    │   ├── app/
    │   │   ├── components/
    │   │   │   ├── registration/
    │   │   │   └── confirmation/
    │   │   ├── models/
    │   │   ├── services/
    │   │   ├── app.component.ts
    │   │   ├── app.config.ts
    │   │   └── app.routes.ts
    │   ├── index.html
    │   ├── main.ts
    │   └── styles.css
    ├── angular.json
    ├── package.json
    └── tsconfig.json
```

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (running locally or via MongoDB Atlas)
- npm or yarn

## Installation

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure MongoDB connection (optional - uses default localhost):
   ```bash
   # Edit .env file to change MongoDB URI if needed
   MONGODB_URI=mongodb://localhost:27017/student_registration
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

   The API will be available at `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Angular development server:
   ```bash
   npm start
   ```

   The application will be available at `http://localhost:4200`

## Features

### Frontend (Angular)
- Reactive form with comprehensive validation
- Fields: Name, Email, Phone Number, Date of Birth, Course Selection, Address
- Loading state during form submission
- User-friendly success and error messages
- Automatic redirect to confirmation page after successful registration

### Backend (Node.js/Express)
- RESTful API endpoint for student registration
- Input validation using express-validator
- Input sanitization to prevent XSS attacks
- MongoDB connection using Mongoose
- Comprehensive error handling
- CORS configuration

### Database (MongoDB)
- Student collection with proper schema validation
- Data types: String, Date, Object
- Indexes for email and name fields

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/students | Register a new student |
| GET | /api/students | Get all students |
| GET | /api/students/:id | Get student by ID |
| GET | /api/health | Health check endpoint |

## Form Validation Rules

### Personal Information
- **Name**: Required, 2-100 characters, letters only (including spaces, hyphens, apostrophes)
- **Email**: Required, valid email format
- **Phone Number**: Required, 10-20 characters, digits and + - ( ) characters
- **Date of Birth**: Required, valid date, age between 5-100 years
- **Course**: Required, must be one of the predefined courses

### Address Information
- **Street**: Required, max 200 characters
- **City**: Required, max 100 characters, letters only
- **State**: Required, max 100 characters, letters only
- **Zip Code**: Required, max 20 characters, alphanumeric
- **Country**: Required, max 100 characters

## Available Courses
- Computer Science
- Information Technology
- Business Administration
- Engineering
- Mathematics
- Physics
- Chemistry
- Biology
- Arts
- Economics

## Error Handling

The system handles various types of errors:
- Validation errors (400 Bad Request)
- Duplicate email errors (409 Conflict)
- Database errors (500 Internal Server Error)
- Network errors

## Technology Stack

### Frontend
- Angular 17
- Reactive Forms
- TypeScript

### Backend
- Node.js
- Express.js
- Mongoose
- express-validator

### Database
- MongoDB
