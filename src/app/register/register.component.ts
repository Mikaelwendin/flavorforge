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

  constructor(private authService: AuthService) {}

  register() {
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
