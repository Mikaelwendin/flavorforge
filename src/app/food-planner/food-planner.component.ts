import { Component, OnInit, ViewChild } from '@angular/core';
import { RecipeModalComponent } from '../recipe-modal/recipe-modal.component';
import { Meal } from '../recipe/recipe.model';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-food-planner',
  templateUrl: './food-planner.component.html',
  styleUrls: ['./food-planner.component.scss'],
})
export class FoodPlannerComponent implements OnInit {
  userFavorites: Meal[] = [];
  daysOfWeek: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  plannedWeek: { [day: string]: Meal } = {};

  @ViewChild(RecipeModalComponent) recipeModal!: RecipeModalComponent;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userService.getUser(user.uid).subscribe((userData) => {
        this.userFavorites = userData?.favoriteRecipes || [];
      });
    }
  }

  openRecipeSelectorModal(day: string): void {
    this.recipeModal.userFavorites = this.userFavorites;
    this.recipeModal.showModal();
  }

  handleRecipeSelection(selectedRecipe: Meal): void {}
}
