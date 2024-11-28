import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  template: `
    <div>Sign In</div>
    <button (click)="authenticate()">Authenticate</button>
  `
})
export class SignInComponent {
  authService = inject(AuthService);
  router = inject(Router);

  authenticate() {
    this.authService.isAuthenticated = true
    this.router.navigate(['/']);
  }
}
