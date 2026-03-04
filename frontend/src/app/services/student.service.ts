import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Student, StudentResponse } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:3000/api/students';

  constructor(private http: HttpClient) {}

  registerStudent(student: Student): Observable<StudentResponse> {
    return this.http.post<StudentResponse>(this.apiUrl, student).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<StudentResponse> {
    let errorMessage = 'An error occurred while processing your request';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      }
    }

    return throwError(() => ({
      success: false,
      message: errorMessage,
      errors: error.error?.errors || []
    }));
  }
}
