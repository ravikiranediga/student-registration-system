export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Student {
  name: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  course: string;
  address: Address;
}

export interface StudentResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    email: string;
    course: string;
    registrationDate: string;
  };
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

export const COURSES = [
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
];
