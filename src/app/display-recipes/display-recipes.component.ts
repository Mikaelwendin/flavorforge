import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { inOutAnimation } from '../app.animations';
import { Meal } from '../recipe/recipe.model';
import { RecipeService } from '../services/recipe.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-display-recipes',
  templateUrl: './display-recipes.component.html',
  styleUrls: ['./display-recipes.component.scss'],
  animations: [inOutAnimation],
})
export class DisplayRecipesComponent implements OnInit {
  searchQuery: string = '';
  searchResults: Meal[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  selectedCategory: string = '';
  randomRecipe: Meal | undefined;
  loading = false;

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
    this.loading = true;
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

    this.loading = false;
  }

  clearSearchResults() {
    this.searchResults = [];
    this.searchService.setSearchResults(this.searchResults);
    this.searchQuery = '';
  }

  searchRecipes() {
    if (this.searchQuery.trim() !== '') {
      this.loading = true;
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

    this.loading = false;
  }
  getMealsByCategory(event: Event): void {
    const category = (event.target as HTMLSelectElement).value;
    this.loading = true;
    this.currentPage = 1;
    this.recipeService.getMealsByCategory(category).subscribe(
      (response) => {
        console.log(response);
        this.searchResults = response.meals;
        this.searchService.setSearchResults(this.searchResults);
      },
      (error) => {
        console.error('Error when fetching meals by category:', error);
      },
      () => {
        this.loading = false;
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  getPageArray(): number[] {
    const pageCount = Math.ceil(this.searchResults.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }
}
