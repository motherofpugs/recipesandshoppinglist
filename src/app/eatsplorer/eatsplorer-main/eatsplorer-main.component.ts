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
    this.recipeService.recipesChanged$.subscribe({
      next: (recipes: Recipe[]) => {
        const uniqueIngredients: { [key: string]: Ingredient } = {};
        recipes.forEach((recipe) => {
          recipe.ingredients.forEach((ingredient) => {
            if (uniqueIngredients[ingredient.name]) {
              uniqueIngredients[ingredient.name].amount += ingredient.amount;
            } else {
              uniqueIngredients[ingredient.name] = {
                id: ingredient.id,
                name: ingredient.name,
                amount: ingredient.amount,
              };
            }
          });
        });

        this.ingredients = Object.values(uniqueIngredients);

        this.ingredients.forEach((ingredient) => {
          this.itemGridForm.addControl(ingredient.name, new FormControl(false));
        });
      },
    });

    this.itemGridForm.valueChanges.subscribe(
      (value: { [key: string]: boolean }) => {
        this.selectedIngredients = Object.keys(value).filter(
          (key) => value[key]
        );
      }
    );
    this.recipeService.getRecipes();
  }
  selectItem() {
    const formValues = this.itemGridForm.value as { [key: string]: boolean };

    const selectedItems = Object.keys(formValues)
      .filter((key) => formValues[key] === true)
      .map((key) => ({ name: key }));

    console.log(selectedItems);
  }
  findRecipes() {
    this.filteredRecipes = this.recipeService.recipes.filter(
      (recipe: Recipe) => {
        return recipe.ingredients.every((item) => {
          return this.selectedIngredients.includes(item.name);
        });
      }
    );

    this.itemGridForm.reset();
  }
}
