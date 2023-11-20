import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shared/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.shoppingListService.newItem.subscribe({
      next: (item: Ingredient) => this.ingredients.push(item),
    });
    this.shoppingListService.ingredientsChanged.subscribe({
      next: (ingredients) => {
        this.ingredients = ingredients;
      },
    });
  }
  selectItem(id?: string) {
    this.shoppingListService.selectedItem.next(id);
  }
}
