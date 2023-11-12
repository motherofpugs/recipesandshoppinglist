import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from './ingredient.model';
import { Recipe } from '../recipes/recipe.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  newItem = new Subject<Ingredient>();
  selectedItem = new Subject<number>();
  ingredientsChanged = new Subject<Ingredient[]>();

  constructor() {}

  addItem(itemName: string, amount: number) {
    const newIngredient = new Ingredient(itemName, amount);
    this.newItem.next(newIngredient);
  }

  addItemFromRecipe(recipe: Recipe) {
    recipe.ingredients.forEach((ingredient) =>
      this.ingredients.push(ingredient)
    );
  }

  selectItem(itemI: number) {
    return this.ingredients[itemI];
  }

  deleteItem(itemI: number) {
    this.ingredients.splice(itemI, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngreditent(itemI: number, newIngredient: Ingredient) {
    this.ingredients[itemI] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
