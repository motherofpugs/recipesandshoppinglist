import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from './ingredient.model';
import { Recipe } from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  newItem = new EventEmitter<Ingredient>();

  constructor() {}

  addItem(itemName: string, amount: number) {
    const newIngredient = new Ingredient(itemName, amount);
    this.newItem.emit(newIngredient);
  }

  addItemFromRecipe(recipe: Recipe) {
    recipe.ingredients.forEach((ingredient) =>
      this.ingredients.push(ingredient)
    );
  }
}
