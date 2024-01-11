import { Component, HostListener } from '@angular/core';
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
  activeMenu: boolean = false;
  showMenu: boolean = false;

  constructor(private authService: AuthService, private store: Store) {
    this.authService.isAuthenticated$.subscribe((loggedIn) => {
      console.log('Is logged in:', loggedIn);
      this.isLoggedIn = loggedIn;
    });
    this.user$ = this.store.select(selectUser);
  }

  public menuOnClick = () => {
    this.activeMenu = !this.activeMenu;
    this.showMenu = this.activeMenu;
  };

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.showMenu = false;
    this.activeMenu = false;
  }
}
