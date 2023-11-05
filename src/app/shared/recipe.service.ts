import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from './ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Easy Veggie Quesadillas',
      'Quick, healthy and easy to make!',
      'https://source.unsplash.com/900x900/?Quesadillas',
      [
        new Ingredient('Tortilla', 6),
        new Ingredient('Jalapenho', 1),
        new Ingredient('Red pepper', 2),
        new Ingredient('Onion', 1),
        new Ingredient('Cheese', 1),
        new Ingredient('Sour cream', 1),
      ]
    ),
    new Recipe(
      'Lemony spiced oro ',
      'Simmered in a lightly-spiced broth and tossed with spinach.',
      'https://source.unsplash.com/900x900/?chickpeas',
      [
        new Ingredient('Baby spinach', 2),
        new Ingredient('Garlic', 4),
        new Ingredient('Chickpeas', 1),
        new Ingredient('Onion', 2),
      ]
    ),
  ];
  constructor() {}
  getRecipes() {
    return this.recipes.slice();
  }
}
