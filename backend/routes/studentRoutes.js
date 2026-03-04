const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const { studentValidationRules, validate, sanitizeInput } = require('../middleware/validation');

// POST /api/students - Register a new student
router.post('/',
  sanitizeInput,
  studentValidationRules,
  validate,
  async (req, res) => {
    try {
      const { name, email, phoneNumber, dateOfBirth, course, address } = req.sanitizedBody;

      // Check if email already exists
      const existingStudent = await Student.findOne({ email: email.toLowerCase() });
      if (existingStudent) {
        return res.status(409).json({
          success: false,
          message: 'A student with this email address is already registered'
        });
      }

      // Create new student
      const student = new Student({
        name,
        email: email.toLowerCase(),
        phoneNumber,
        dateOfBirth,
        course,
        address,
        registrationDate: new Date(),
        status: 'active'
      });

      // Save to database
      const savedStudent = await student.save();

      // Return success response (excluding sensitive data if needed)
      res.status(201).json({
        success: true,
        message: 'Student registered successfully',
        data: {
          id: savedStudent._id,
          name: savedStudent.name,
          email: savedStudent.email,
          course: savedStudent.course,
          registrationDate: savedStudent.registrationDate
        }
      });

    } catch (error) {
      // Handle MongoDB duplicate key error
      if (error.code === 11000) {
        return res.status(409).json({
          success: false,
          message: 'A student with this email address is already registered'
        });
      }

      // Handle validation errors
      if (error.name === 'ValidationError') {
        const validationErrors = Object.keys(error.errors).map(key => ({
          field: key,
          message: error.errors[key].message
        }));
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: validationErrors
        });
      }

      // Handle other errors
      console.error('Registration error:', error);
      res.status(500).json({
        success: false,
        message: 'An error occurred while processing your request. Please try again later.'
      });
    }
  }
);

// GET /api/students - Get all students (for testing purposes)
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().select('-__v');
    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching students'
    });
  }
});

// GET /api/students/:id - Get a student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).select('-__v');
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    console.error('Error fetching student:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid student ID format'
      });
    }
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching the student'
    });
  }
});

module.exports = router;
