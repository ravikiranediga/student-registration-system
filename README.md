# 🎓 Student Registration System

A modern, full-stack student registration application built with Angular, Node.js, and MongoDB. This project provides a complete solution for managing student enrollments with robust validation and a responsive user interface.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Clone the Repository](#clone-the-repository)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🌟 Overview

This is a production-ready full-stack application designed for educational institutions to manage student registrations. The system includes a modern Angular frontend with reactive forms and a RESTful API backend powered by Node.js and Express.



## 🛠 Tech Stack

### Frontend
| Technology | Version |
|------------|---------|
| Angular | 17+ |
| TypeScript | 5.x |
| Reactive Forms | Built-in |

### Backend
| Technology | Version |
|------------|---------|
| Node.js | 18+ |
| Express.js | 4.x |
| Mongoose | 8.x |
| express-validator | 7.x |

### Database
| Technology | Purpose |
|------------|---------|
| MongoDB | NoSQL Database |

---

## 📁 Project Structure

```
student-registration-system/
├── backend/                      # Express.js REST API
│   ├── models/
│   │   └── Student.js           # Mongoose schema
│   ├── routes/
│   │   └── studentRoutes.js    # API endpoints
│   ├── middleware/
│   │   └── validation.js       # Input validation
│   ├── server.js              # Application entry point
│   ├── package.json
│   └── .env.example           # Environment template
│
├── frontend/                    # Angular Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── registration/    # Registration form
│   │   │   │   └── confirmation/   # Success confirmation
│   │   │   ├── models/             # TypeScript interfaces
│   │   │   ├── services/           # HTTP services
│   │   │   ├── app.component.ts
│   │   │   ├── app.config.ts
│   │   │   └── app.routes.ts
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.css
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
│
├── examples/                   # UI screenshots
├── .gitignore
└── README.md
```

---

## ✨ Features

### Frontend Features
- ✅ Reactive forms with real-time validation
- ✅ Comprehensive form fields (personal info, address)
- ✅ Loading states and progress indicators
- ✅ Success/error message handling
- ✅ Automatic redirect after registration
- ✅ Responsive design for all devices

### Backend Features
- ✅ RESTful API architecture
- ✅ Input validation and sanitization
- ✅ MongoDB integration with Mongoose
- ✅ CORS configuration
- ✅ Comprehensive error handling
- ✅ Health check endpoint

### Database Features
- ✅ Schema validation
- ✅ Indexed fields for performance
- ✅ Timestamps for tracking

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v6.0 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)
- **npm** or **yarn** (comes with Node.js)

---

### Clone the Repository

```bash
# Clone the repository
git clone https://github.com/ravikiranediga/student-registration-system.git

# Navigate to the project directory
cd student-registration-system
```

---

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment file (optional - uses defaults)
cp .env.example .env

# Start the development server
npm start
```

The API server will start at: **http://localhost:3000**

#### Available Backend Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start the production server |
| `npm run dev` | Start in development mode (if configured) |

---

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The Angular application will be available at: **http://localhost:4200**

#### Available Frontend Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `ng test` | Run unit tests |

---

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/students` | Register new student | JSON |
| GET | `/students` | Get all students | - |
| GET | `/students/:id` | Get student by ID | - |
| GET | `/health` | Health check | - |

### POST /students Request Body

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "+1234567890",
  "dateOfBirth": "2000-01-15",
  "course": "Computer Science",
  "address": {
    "street": "123 Main Street",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }
}
```

### Available Courses
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

---

## ⚙️ Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=3000

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/student_registration

# Node Environment
NODE_ENV=development
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

**Ravi Kiran Ediga**

- GitHub: [@ravikiranediga](https://github.com/ravikiranediga)
- Email: ravikiranediga@example.com

---

<p align="center">
  Made with ❤️ using Angular + Node.js + MongoDB
</p>
