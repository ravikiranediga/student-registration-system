const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  city: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  state: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  zipCode: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20
  },
  country: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
    default: 'USA'
  }
}, { _id: false });

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters'],
    minlength: [2, 'Name must be at least 2 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    maxlength: [100, 'Email cannot exceed 100 characters'],
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    maxlength: [20, 'Phone number cannot exceed 20 characters']
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required'],
    validate: {
      validator: function(value) {
        const age = new Date() - new Date(value);
        const ageInYears = age / (1000 * 60 * 60 * 24 * 365);
        return ageInYears >= 5 && ageInYears <= 100;
      },
      message: 'Age must be between 5 and 100 years'
    }
  },
  course: {
    type: String,
    required: [true, 'Course selection is required'],
    enum: [
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
    ]
  },
  address: {
    type: addressSchema,
    required: [true, 'Address is required']
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'graduated'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Index for faster queries
studentSchema.index({ email: 1 });
studentSchema.index({ name: 1 });

module.exports = mongoose.model('Student', studentSchema);
