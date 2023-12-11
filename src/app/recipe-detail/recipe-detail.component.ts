import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meal } from '../recipe/recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  recipeId: string | null | undefined;
  meal: Meal | undefined;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    console.log('Meal details:', this.meal);

    this.route.params.subscribe((params) => {
      const recipeId = params['id'];
      console.log('Recipe ID:', recipeId);
      this.recipeService.getRecipeById(recipeId).subscribe(
        (details) => {
          this.meal = details.meals[0];
        },
        (error) => {
          console.error('Error fetching recipe details:', error);
        }
      );
    });
  }
}
