import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { MealResponse } from '../recipe/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private apiBaseUrl = 'https://www.themealdb.com/api/json/v1/1';

  constructor(private http: HttpClient) {}

  searchRecipes(query: string): Observable<MealResponse> {
    const url = `${this.apiBaseUrl}/search.php`;
    const params = new HttpParams().set('s', query);
    return this.http.get<MealResponse>(url, { params });
  }

  getRecipeById(id: string): Observable<any> {
    const url = `${this.apiBaseUrl}/lookup.php`;
    const params = new HttpParams().set('i', id);
    return this.http
      .get(url, { params })
      .pipe(tap((response) => console.log('API Response:', response)));
  }

  getMealsByCategory(category: string): Observable<MealResponse> {
    const url = `${this.apiBaseUrl}/filter.php?c=${category}`;
    return this.http.get<MealResponse>(url);
  }

  getRandomRecipe(): Observable<MealResponse> {
    const url = `${this.apiBaseUrl}/random.php`;
    return this.http.get<MealResponse>(url);
  }
}
