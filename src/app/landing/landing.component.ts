import { Component } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Meal, MealResponse } from '../recipe/recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  searchQuery: string = '';
  searchResults: Meal[] = [];

  constructor(private recipeService: RecipeService) {}

  searchRecipes() {
    if (this.searchQuery.trim() !== '') {
      this.recipeService
        .searchRecipes(this.searchQuery)
        .pipe(debounceTime(300), distinctUntilChanged())
        .subscribe(
          (response) => {
            console.log(response);
            this.searchResults = response.meals;
          },
          (error) => {
            console.error('Error when searching:', error);
          }
        );
    }
  }
}
