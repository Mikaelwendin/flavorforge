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
  gdprAgreed: boolean = false;

  registrationSuccess = false;
  registrationError = false;
  registrationErrorMessage: string | null = null;
  isSubmitting = false;
  passwordMismatchError: string | null = null;
  invalidEmailError: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.resetErrors();
  }
  resetErrors() {
    this.passwordMismatchError = null;
    this.invalidEmailError = null;
  }

  async register() {
    this.resetErrors();

    if (this.isSubmitting || !this.gdprAgreed) {
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.passwordMismatchError = 'Passwords do not match';
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.invalidEmailError = 'Please enter a valid email address.';
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

    if (this.registrationSuccess) {
      setTimeout(() => {
        this.navigateToLandingPage();
      }, 1000);
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  private navigateToLandingPage() {
    this.router.navigate(['/landing']);
  }
  areFieldsFilled(): boolean {
    return (
      !!this.email &&
      !!this.username &&
      !!this.password &&
      !!this.confirmPassword
    );
  }
}
