import { Component } from '@angular/core';
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

  constructor(private authService: AuthService) {}

  register() {
    if (this.password !== this.confirmPassword) {
      console.log('Passwords do not match');
      return;
    }
    this.authService
      .register(this.email, this.password, this.username)
      .then((response) => {
        console.log('Registration successful!', response);
      })
      .catch((error) => {
        console.error('Registration failed:', error);
      });
  }
}
