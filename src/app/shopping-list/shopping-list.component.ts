import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shared/shopping-list.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients!: Ingredient[];
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.shoppingListService.ingredients$.subscribe({
      next: (items: Ingredient[]) => {
        const summedData: {
          [key: string]: {
            amount: number;
            id?: string;
          };
        } = {};
        items.forEach((item) => {
          if (summedData[item.name]) {
            summedData[item.name].amount += item.amount;
          } else {
            summedData[item.name] = {
              amount: item.amount,
              id: item.id,
            };
          }
        });

        this.ingredients = Object.keys(summedData).map((name) => ({
          id: summedData[name].id,
          name,
          amount: summedData[name].amount,
        }));
      },
    });
  }
  selectItem(id?: string) {
    if (id) this.shoppingListService.selectItem(id);
  }
}
