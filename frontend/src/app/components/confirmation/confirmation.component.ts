import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  registrationData: any = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const data = sessionStorage.getItem('registrationData');
    if (data) {
      this.registrationData = JSON.parse(data);
    } else {
      // Redirect back to registration if no data
      this.router.navigate(['/register']);
    }
  }

  registerNewStudent(): void {
    sessionStorage.removeItem('registrationData');
    this.router.navigate(['/register']);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
