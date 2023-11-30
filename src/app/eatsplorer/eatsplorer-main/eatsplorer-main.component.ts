import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ShoppingListService } from 'src/app/shared/shopping-list.service';

@Component({
  selector: 'app-eatsplorer-main',
  templateUrl: './eatsplorer-main.component.html',
  styleUrls: ['./eatsplorer-main.component.css'],
})
export class EatsplorerMainComponent implements OnInit {
  ingredients!: Ingredient[];
  itemGridForm = new FormGroup({});
  selectedIngredients: string[] = [];

  constructor(private shoppingService: ShoppingListService) {}
  ngOnInit(): void {
    this.shoppingService.ingredients$.subscribe({
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
        this.ingredients.forEach((ingredient) => {
          this.itemGridForm.addControl(ingredient.name, new FormControl(false));
        });
      },
    });
    this.itemGridForm.valueChanges.subscribe(
      (value: { [key: string]: boolean }) => {
        console.log(value);
        this.selectedIngredients = Object.keys(value).filter(
          (key) => value[key]
        );
      }
    );
  }

  findRecipe() {
    const formValues = this.itemGridForm.value as { [key: string]: boolean };

    const selectedItems = Object.keys(formValues)
      .filter((key) => formValues[key] === true)
      .map((key) => ({ name: key }));

    console.log(selectedItems);
  }
}
