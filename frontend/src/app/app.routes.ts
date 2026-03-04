import { Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

export const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'register', component: RegistrationComponent },
  { path: 'confirmation', component: ConfirmationComponent }
];
