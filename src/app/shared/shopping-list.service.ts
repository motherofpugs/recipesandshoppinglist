import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from './ingredient.model';
import { Recipe } from '../recipes/recipe.model';
import { Observable, Subject } from 'rxjs';
import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredients: Ingredient[] = [];

  newItem = new Subject<Ingredient>();
  selectedItem = new Subject<string | undefined>();
  ingredientsChanged = new Subject<Ingredient[]>();

  constructor(private dataService: DataStorageService) {
    this.getItems();
  }

  addItem(item: Ingredient) {
    this.dataService.addIgredient(item).subscribe({
      complete: () => {
        this.getItems();
      },
    });
  }

  getItems() {
    this.dataService.getIngredients().subscribe({
      next: (items: Ingredient[]) => {
        this.ingredients = items;
        this.ingredientsChanged.next(this.ingredients);
      },
    });
  }

  addItemFromRecipe(recipe: Recipe) {
    recipe.ingredients.forEach((ingredient) =>
      this.ingredients.push(ingredient)
    );
  }

  selectItem(itemI: string) {
    this.dataService.getIngredient(itemI).subscribe({
      next: (item: Ingredient) => {
        this.selectedItem.next(item.id);
      },
    });
  }

  deleteItem(id: string) {
    this.dataService.deleteRecipe(id).subscribe({
      complete: () => {
        this.getItems();
      },
    });
  }

  updateIngreditent() {
    this.ingredientsChanged.next(this.ingredients);
  }
}
