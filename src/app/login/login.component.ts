import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as UserActions from '../user/user.actions';
import { User } from '../user/user.model';
import { selectUser } from '../user/user.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  email: string = '';
  password: string = '';
  user: User | null = null;
  userSubscription: Subscription;

  constructor(private store: Store) {
    this.userSubscription = this.store.select(selectUser).subscribe((user) => {
      this.user = user;
      if (this.user) {
        console.log('Login successful:', this.user);
      }
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  login() {
    this.store.dispatch(
      UserActions.login({ email: this.email, password: this.password })
    );
  }
}
