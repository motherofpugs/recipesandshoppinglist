import { RecipeService } from 'src/app/shared/recipe.service';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ShoppingListService } from 'src/app/shared/shopping-list.service';
import { Recipe } from 'src/app/recipes/recipe.model';

@Component({
  selector: 'app-eatsplorer-main',
  templateUrl: './eatsplorer-main.component.html',
  styleUrls: ['./eatsplorer-main.component.css'],
})
export class EatsplorerMainComponent implements OnInit {
  ingredients!: Ingredient[];
  itemGridForm = new FormGroup({});
  selectedIngredients: string[] = [];
  filteredRecipes!: Recipe[];

  constructor(
    private shoppingService: ShoppingListService,
    private recipeService: RecipeService
  ) {}
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

  selectRecipe() {
    const formValues = this.itemGridForm.value as { [key: string]: boolean };

    const selectedItems = Object.keys(formValues)
      .filter((key) => formValues[key] === true)
      .map((key) => ({ name: key }));

    console.log(selectedItems);
  }

  findRecipes() {
    this.filteredRecipes = this.recipeService.recipes.filter(
      (recipe: Recipe) =>
        this.selectedIngredients.every((selectedIngredient) =>
          recipe.ingredients.some(
            (recipeIngredient) => recipeIngredient.name === selectedIngredient
          )
        ) && this.selectedIngredients.length === recipe.ingredients.length
    );

    console.log(this.filteredRecipes);
  }
}
