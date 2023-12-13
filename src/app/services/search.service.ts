import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Meal } from '../recipe/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchResultsSubject: BehaviorSubject<Meal[]> = new BehaviorSubject<
    Meal[]
  >([]);
  public searchResults$: Observable<Meal[]> =
    this.searchResultsSubject.asObservable();

  setSearchResults(results: Meal[]): void {
    this.searchResultsSubject.next(results);
  }
}
