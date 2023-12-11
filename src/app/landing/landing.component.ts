import { Component } from '@angular/core';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  searchQuery: string = '';
  searchResults: any[] = [];

  constructor(private recipeService: RecipeService) {}

  searchRecipes() {
    if (this.searchQuery.trim() !== '') {
      this.recipeService.searchRecipes(this.searchQuery).subscribe(
        (response) => {
          this.searchResults = response.meals;
        },
        (error) => {
          console.error('Error when searching', error);
        }
      );
    }
  }
}
