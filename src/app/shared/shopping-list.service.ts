import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Ingredient } from './ingredient.model';
import { Recipe } from '../recipes/recipe.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private ingredientsSubject: BehaviorSubject<Ingredient[]> =
    new BehaviorSubject<Ingredient[]>([]);
  ingredients$ = this.ingredientsSubject.asObservable();

  selectedItem: Subject<Ingredient> = new Subject<Ingredient>();

  constructor(private dataService: DataStorageService) {
    this.getItems();
  }

  getItems() {
    this.dataService.getIngredients().subscribe({
      next: (items: Ingredient[]) => {
        this.ingredientsSubject.next(items);
      },
    });
  }

  addItem(item: Ingredient) {
    this.dataService.addIgredient(item).subscribe({
      complete: () => {
        this.getItems();
      },
    });
  }

  addItemFromRecipe(recipe: Recipe) {
    recipe.ingredients.forEach((ingredient) => {
      this.addItem(ingredient);
    });
  }

  selectItem(itemI: string) {
    this.dataService.getIngredient(itemI).subscribe({
      next: (item: Ingredient) => {
        this.selectedItem.next(item);
      },
    });
  }

  deleteItem(id: string) {
    this.dataService.deleteIgredient(id).subscribe({
      complete: () => {
        this.getItems();
      },
    });
  }

  updateIngreditent(item: Ingredient) {
    this.dataService.updateIngredient(item).subscribe({
      complete: () => {
        this.getItems();
      },
    });
  }
}
