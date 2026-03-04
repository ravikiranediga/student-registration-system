import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>Student Registration System</h1>
      </header>
      <main class="app-main">
        <router-outlet></router-outlet>
      </main>
      <footer class="app-footer">
        <p>&copy; 2026 Student Registration System. All rights reserved.</p>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    .app-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1.5rem 2rem;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .app-header h1 {
      margin: 0;
      font-size: 1.75rem;
      font-weight: 600;
    }
    
    .app-main {
      flex: 1;
      padding: 2rem;
      background-color: #f8f9fa;
    }
    
    .app-footer {
      background-color: #2d3748;
      color: #a0aec0;
      text-align: center;
      padding: 1rem;
      font-size: 0.875rem;
    }
    
    .app-footer p {
      margin: 0;
    }
  `]
})
export class AppComponent {
  title = 'Student Registration System';
}
