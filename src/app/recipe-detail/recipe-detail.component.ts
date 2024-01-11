import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { inOutAnimation } from '../app.animations';
import { Meal } from '../recipe/recipe.model';
import { AuthService } from '../services/auth.service';
import { RecipeService } from '../services/recipe.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
  animations: [inOutAnimation],
})
export class RecipeDetailComponent implements OnInit {
  recipeId: string | null | undefined;
  meal: Meal | undefined;
  showIngredients: boolean = false;
  showInstructions: boolean = false;
  isRecipeInFavorites: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private userService: UserService,
    private location: Location
  ) {}

  getVideoEmbedUrl(url?: string): SafeResourceUrl | undefined {
    if (url) {
      const videoId = url.split('v=')[1];
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    }

    return undefined;
  }

  getIngredientsArray(meal: Meal | undefined): string[] {
    const ingredients: string[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal?.[`strIngredient${i}` as keyof Meal];
      const mesurement = meal?.[`strMeasure${i}` as keyof Meal];
      if (ingredient && mesurement) {
        ingredients.push(mesurement + ' ' + ingredient);
      }
    }
    return ingredients;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const recipeId = params['id'];
      this.recipeService.getRecipeById(recipeId).subscribe(
        (details) => {
          this.meal = details.meals[0];
          this.checkRecipeInFavorites();
        },
        (error) => {
          console.error('Error fetching recipe details:', error);
        }
      );
    });
  }
  checkRecipeInFavorites(): void {
    if (this.meal && this.isUserLoggedIn()) {
      const currentUser = this.authService.getCurrentUser();
      if (currentUser) {
        this.userService
          .isRecipeInFavorites(currentUser.uid, this.meal)
          .subscribe((isInFavorites) => {
            this.isRecipeInFavorites = isInFavorites;
          });
      }
    }
  }
  goBack(): void {
    this.location.back();
  }
  addToFavorites(): void {
    if (this.meal && this.isUserLoggedIn() && !this.isRecipeInFavorites) {
      const currentUser = this.authService.getCurrentUser();
      if (currentUser) {
        this.userService.addToFavorites(currentUser.uid, this.meal);
        this.isRecipeInFavorites = true;
      }
    }
  }

  isUserLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  toggleIngredients() {
    this.showIngredients = !this.showIngredients;
  }

  toggleInstructions() {
    this.showInstructions = !this.showInstructions;
  }
}
