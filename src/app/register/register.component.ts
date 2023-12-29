import { Component } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  username: string = '';
  confirmPassword: string = '';

  registrationSuccess = false;
  registrationError = false;
  registrationErrorMessage: string | null = null;
  isSubmitting = false;

  constructor(private authService: AuthService, private router: Router) {}

  async register() {
    if (this.isSubmitting) {
      return;
    }

    if (this.password !== this.confirmPassword) {
      console.log('Passwords do not match');
      return;
    }

    try {
      this.isSubmitting = true;
      const response = await this.authService.register(
        this.email,
        this.password,
        this.username
      );
      this.registrationSuccess = true;
      console.log('Registration successful!', response);
    } catch (error) {
      const firebaseError = error as FirebaseError;
      this.registrationError = true;
      this.registrationErrorMessage =
        firebaseError.message || 'An error occurred during registration.';
      console.error('Registration failed:', firebaseError);
    } finally {
      this.isSubmitting = false;
    }
    setTimeout(() => {
      this.navigateToLandingPage();
    }, 1000);
  }
  private navigateToLandingPage() {
    this.router.navigate(['/landing']);
  }
}
