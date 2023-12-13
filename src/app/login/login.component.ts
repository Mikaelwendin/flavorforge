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

  login() {
    this.store.dispatch(
      UserActions.login({ email: this.email, password: this.password })
    );
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
