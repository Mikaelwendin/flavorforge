import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Meal } from '../recipe/recipe.model';
import { RecipeService } from '../services/recipe.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-display-recipes',
  templateUrl: './display-recipes.component.html',
  styleUrls: ['./display-recipes.component.scss'],
})
export class DisplayRecipesComponent implements OnInit {
  searchQuery: string = '';
  searchResults: Meal[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  selectedCategory: string = '';
  randomRecipe: Meal | undefined;

  constructor(
    private recipeService: RecipeService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.searchService.searchResults$.subscribe((results) => {
      this.searchResults = results;
    });
  }

  getRandomRecipe() {
    this.clearSearchResults();
    this.currentPage = 1;
    this.recipeService.getRandomRecipe().subscribe(
      (response) => {
        this.searchResults[0] = response.meals?.[0];
      },
      (error) => {
        console.error('Error when fetching random recipe:', error);
      }
    );
  }

  clearSearchResults() {
    this.searchResults = [];
    this.searchService.setSearchResults(this.searchResults);
    this.searchQuery = '';
  }

  searchRecipes() {
    if (this.searchQuery.trim() !== '') {
      this.recipeService
        .searchRecipes(this.searchQuery)
        .pipe(debounceTime(300), distinctUntilChanged())
        .subscribe(
          (response) => {
            console.log(response);
            this.searchResults = response.meals;
            this.searchService.setSearchResults(this.searchResults);
          },
          (error) => {
            console.error('Error when searching:', error);
          }
        );
    }
  }
  getMealsByCategory(category: string): void {
    this.currentPage = 1;
    this.recipeService.getMealsByCategory(category).subscribe(
      (response) => {
        console.log(response);
        this.searchResults = response.meals;
        this.searchService.setSearchResults(this.searchResults);
      },
      (error) => {
        console.error('Error when fetching meals by category:', error);
      }
    );
  }

  get paginatedResults(): Meal[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.searchResults.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }
  getPageArray(): number[] {
    const pageCount = Math.ceil(this.searchResults.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }
}
