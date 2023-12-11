import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../user/user.model';
import { selectUser } from '../user/user.selectors';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  isLoggedIn: boolean = false;
  user$: Observable<User | null>;

  constructor(private authService: AuthService, private store: Store) {
    this.authService.isAuthenticated$.subscribe((loggedIn) => {
      console.log('Is logged in:', loggedIn);
      this.isLoggedIn = loggedIn;
    });
    this.user$ = this.store.select(selectUser);
  }
}
