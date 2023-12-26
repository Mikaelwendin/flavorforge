import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Meal } from '../recipe/recipe.model';

@Component({
  selector: 'app-recipe-modal',
  templateUrl: './recipe-modal.component.html',
  styleUrls: ['./recipe-modal.component.scss'],
})
export class RecipeModalComponent {
  @Input() userFavorites!: Meal[];
  @Output() recipeSelected = new EventEmitter<Meal>();

  private selectedRecipe?: Meal;
  showModal = false;

  selectRecipe(recipe: Meal): void {
    this.selectedRecipe = recipe;
    this.recipeSelected.emit(recipe);
    this.hide();
  }

  hide(): void {
    this.selectedRecipe = undefined;
    this.showModal = false;
  }

  show(): void {
    this.showModal = true;
  }
}
