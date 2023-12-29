import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import * as UserActions from '../user/user.actions';
import { User } from '../user/user.model';
import { selectUser } from '../user/user.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  user: User | null = null;
  userSubscription: Subscription;
  isLoggedIn: boolean = false;
  isLoggingIn: boolean = false;
  loginError: string | null = null;

  constructor(
    private store: Store,
    private authService: AuthService,
    private router: Router
  ) {
    this.userSubscription = this.store.select(selectUser).subscribe((user) => {
      this.user = user;
    });

    this.authService.isAuthenticated$.subscribe((loggedIn) => {
      console.log('Is logged in:', loggedIn);
      this.isLoggedIn = loggedIn;
    });
  }

  async login() {
    this.isLoggingIn = true;
    this.loginError = null;
    if (!this.isValidEmail(this.email)) {
      this.loginError = 'Please enter a valid email address.';
      this.isLoggingIn = false;
      return;
    }

    try {
      await this.authService.login(this.email, this.password);
    } catch (error) {
      this.loginError = 'Invalid email or password. Please try again.';
    } finally {
      this.isLoggingIn = false;
      this.navigateToLandingPage();
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async logOut() {
    await this.authService.logout();
    this.userSubscription.unsubscribe();
    this.navigateToLandingPage();
  }

  private navigateToLandingPage() {
    this.router.navigate(['/landing']);
  }
}
