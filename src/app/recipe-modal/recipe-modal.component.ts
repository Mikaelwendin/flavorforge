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

  showModal(): void {
    // SLäng in show logic scss?
    console.log('showmodal!');
  }

  selectRecipe(recipe: Meal): void {
    this.recipeSelected.emit(recipe);
  }
}
