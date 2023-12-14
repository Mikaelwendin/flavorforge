import { Meal } from '../recipe/recipe.model';

export interface User {
  uid: string;
  email: string;
  username: string;
  favoriteRecipes?: Meal[];
}
