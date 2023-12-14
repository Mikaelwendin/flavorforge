import { Component, OnInit } from '@angular/core';
import { Meal } from '../recipe/recipe.model';
import { AuthService } from '../services/auth.service';
import { RecipeService } from '../services/recipe.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.scss'],
})
export class MyPageComponent implements OnInit {
  userFavorites: Meal[] = [];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userService.getUser(user.uid).subscribe((userData) => {
        this.userFavorites = userData?.favoriteRecipes || [];
      });
    }
  }
}
