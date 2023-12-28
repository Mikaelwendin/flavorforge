import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Meal } from '../recipe/recipe.model';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class MyPageComponent implements OnInit {
  userFavorites: Meal[] = [];
  loading = false;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

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
}
