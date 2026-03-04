const { body, validationResult } = require('express-validator');

// Utility to sanitize strings
const sanitizeString = (value) => {
  if (typeof value !== 'string') return value;
  return value.trim().replace(/[<>]/g, '');
};

// Validation rules for student registration
const studentValidationRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('Name can only contain letters, spaces, hyphens, and apostrophes'),
  
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('phoneNumber')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[0-9+\-\s()]+$/)
    .withMessage('Phone number can only contain digits, spaces, and +, -, ()')
    .isLength({ min: 10, max: 20 })
    .withMessage('Phone number must be between 10 and 20 characters'),
  
  body('dateOfBirth')
    .notEmpty()
    .withMessage('Date of birth is required')
    .isISO8601()
    .withMessage('Please provide a valid date')
    .custom((value) => {
      const dob = new Date(value);
      const age = new Date() - dob;
      const ageInYears = age / (1000 * 60 * 60 * 24 * 365);
      if (ageInYears < 5 || ageInYears > 100) {
        throw new Error('Age must be between 5 and 100 years');
      }
      return true;
    }),
  
  body('course')
    .trim()
    .notEmpty()
    .withMessage('Course selection is required')
    .isIn([
      'Computer Science',
      'Information Technology',
      'Business Administration',
      'Engineering',
      'Mathematics',
      'Physics',
      'Chemistry',
      'Biology',
      'Arts',
      'Economics'
    ])
    .withMessage('Please select a valid course'),
  
  body('address.street')
    .trim()
    .notEmpty()
    .withMessage('Street address is required')
    .isLength({ max: 200 })
    .withMessage('Street cannot exceed 200 characters'),
  
  body('address.city')
    .trim()
    .notEmpty()
    .withMessage('City is required')
    .isLength({ max: 100 })
    .withMessage('City cannot exceed 100 characters')
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('City can only contain letters, spaces, hyphens, and apostrophes'),
  
  body('address.state')
    .trim()
    .notEmpty()
    .withMessage('State is required')
    .isLength({ max: 100 })
    .withMessage('State cannot exceed 100 characters')
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('State can only contain letters, spaces, hyphens, and apostrophes'),
  
  body('address.zipCode')
    .trim()
    .notEmpty()
    .withMessage('Zip code is required')
    .isLength({ max: 20 })
    .withMessage('Zip code cannot exceed 20 characters')
    .matches(/^[a-zA-Z0-9\s-]+$/)
    .withMessage('Zip code can only contain letters, numbers, spaces, and hyphens'),
  
  body('address.country')
    .trim()
    .notEmpty()
    .withMessage('Country is required')
    .isLength({ max: 100 })
    .withMessage('Country cannot exceed 100 characters')
    .default('USA')
];

// Middleware to handle validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(err => ({
      field: err.path,
      message: err.msg
    }));
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: formattedErrors
    });
  }
  next();
};

// Sanitize input data
const sanitizeInput = (req, res, next) => {
  const sanitizeObject = (obj) => {
    if (typeof obj === 'string') {
      return sanitizeString(obj);
    }
    if (Array.isArray(obj)) {
      return obj.map(item => sanitizeObject(item));
    }
    if (obj && typeof obj === 'object') {
      const sanitized = {};
      for (const key in obj) {
        sanitized[key] = sanitizeObject(obj[key]);
      }
      return sanitized;
    }
    return obj;
  };
  
  req.sanitizedBody = sanitizeObject(req.body);
  next();
};

module.exports = {
  studentValidationRules,
  validate,
  sanitizeInput
};
