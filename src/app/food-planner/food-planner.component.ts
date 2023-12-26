import { Component, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs';
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
        this.plannedWeek = userData?.plannedWeek || {};
      });
    }
  }

  openRecipeSelectorModal(day: string): void {
    if (this.recipeModal.showModal) {
      return;
    }

    this.recipeModal.show();
    this.recipeModal.recipeSelected
      .pipe(take(1))
      .subscribe((selectedRecipe) => {
        if (selectedRecipe) {
          this.assignRecipe(day, selectedRecipe);
          this.updatePlannedWeekInDatabase();
        }
        this.recipeModal.hide();
      });
  }

  assignRecipe(day: string, recipe: Meal): void {
    this.plannedWeek[day] = { ...recipe };
    console.log(day);
  }

  updatePlannedWeekInDatabase(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userService
        .updateUser(user.uid, { plannedWeek: this.plannedWeek })
        .then(() => {
          console.log('User updated:', this.plannedWeek);
          this.recipeModal.show();
        })
        .catch((error) => {
          console.error('Error updating user:', error);
        });
    }
  }
}
