import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { COURSES, StudentResponse } from '../../models/student.model';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  courses = COURSES;
  isLoading = false;
  submissionResult: StudentResponse | null = null;
  showSuccessMessage = false;
  showErrorMessage = false;
  errorMessage = '';

  maxDate: string;
  minDate: string;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router
  ) {
    const today = new Date();
    const minAge = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
    const maxAge = new Date(today.getFullYear() - 5, today.getMonth(), today.getDate());
    
    this.maxDate = minAge.toISOString().split('T')[0];
    this.minDate = maxAge.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        Validators.pattern(/^[a-zA-Z\s'-]+$/)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      phoneNumber: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(20),
        Validators.pattern(/^[0-9+\-\s()]+$/)
      ]],
      dateOfBirth: ['', [
        Validators.required
      ]],
      course: ['', [
        Validators.required
      ]],
      address: this.fb.group({
        street: ['', [
          Validators.required,
          Validators.maxLength(200)
        ]],
        city: ['', [
          Validators.required,
          Validators.maxLength(100),
          Validators.pattern(/^[a-zA-Z\s'-]+$/)
        ]],
        state: ['', [
          Validators.required,
          Validators.maxLength(100),
          Validators.pattern(/^[a-zA-Z\s'-]+$/)
        ]],
        zipCode: ['', [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-Z0-9\s-]+$/)
        ]],
        country: ['USA', [
          Validators.required,
          Validators.maxLength(100)
        ]]
      })
    });
  }

  get f() {
    return this.registrationForm.controls;
  }

  get addressForm() {
    return this.registrationForm.get('address') as FormGroup;
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) {
      this.markFormGroupTouched(this.registrationForm);
      return;
    }

    this.isLoading = true;
    this.showSuccessMessage = false;
    this.showErrorMessage = false;
    this.submissionResult = null;

    const formData = this.registrationForm.value;
    
    this.studentService.registerStudent(formData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.submissionResult = response;
        
        if (response.success) {
          this.showSuccessMessage = true;
          // Store registration data for confirmation page
          sessionStorage.setItem('registrationData', JSON.stringify(response.data));
          // Redirect to confirmation page after a short delay
          setTimeout(() => {
            this.router.navigate(['/confirmation']);
          }, 1500);
        } else {
          this.showErrorMessage = true;
          this.errorMessage = response.message;
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.showErrorMessage = true;
        this.errorMessage = error.message || 'An unexpected error occurred. Please try again.';
      }
    });
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registrationForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  isAddressFieldInvalid(fieldName: string): boolean {
    const field = this.addressForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  getErrorMessage(fieldName: string): string {
    const control = this.registrationForm.get(fieldName);
    if (!control || !control.errors) return '';

    if (control.errors['required']) return `${this.formatFieldName(fieldName)} is required`;
    if (control.errors['minlength']) return `${this.formatFieldName(fieldName)} must be at least ${control.errors['minlength'].requiredLength} characters`;
    if (control.errors['maxlength']) return `${this.formatFieldName(fieldName)} cannot exceed ${control.errors['maxlength'].requiredLength} characters`;
    if (control.errors['email']) return 'Please enter a valid email address';
    if (control.errors['pattern']) return `${this.formatFieldName(fieldName)} contains invalid characters`;

    return 'Invalid input';
  }

  getAddressErrorMessage(fieldName: string): string {
    const control = this.addressForm.get(fieldName);
    if (!control || !control.errors) return '';

    if (control.errors['required']) return `${this.formatFieldName(fieldName)} is required`;
    if (control.errors['maxlength']) return `${this.formatFieldName(fieldName)} cannot exceed ${control.errors['maxlength'].requiredLength} characters`;
    if (control.errors['pattern']) return `${this.formatFieldName(fieldName)} contains invalid characters`;

    return 'Invalid input';
  }

  private formatFieldName(name: string): string {
    return name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  }
}
