import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Meal } from '../recipe/recipe.model';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../user/user.model';
import { selectUser } from '../user/user.selectors';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class MyPageComponent implements OnInit {
  userFavorites: Meal[] = [];
  loading = false;
  userSubscription: Subscription;
  isLoggedIn: boolean = false;
  user: User | null = null;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private store: Store,
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

  ngOnInit(): void {
    this.loading = true;
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userService.getUser(user.uid).subscribe((userData) => {
        this.userFavorites = userData?.favoriteRecipes || [];
      });
    }
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }
  async logOut() {
    await this.authService.logout();
    this.userSubscription.unsubscribe();
    this.navigateToLoginPage();
  }
  private navigateToLoginPage() {
    this.router.navigate(['/login']);
  }
}
