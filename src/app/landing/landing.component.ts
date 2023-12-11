import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Meal } from '../recipe/recipe.model';
import { RecipeService } from '../services/recipe.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  searchQuery: string = '';
  searchResults: Meal[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;

  constructor(
    private recipeService: RecipeService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.searchService.searchResults$.subscribe((results) => {
      this.searchResults = results;
    });
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
