import { map } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/recipes/recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeService } from 'src/app/shared/recipe.service';
import { ShoppingListService } from 'src/app/shared/shopping-list.service';

@Component({
  selector: 'app-eatsplorer-list',
  templateUrl: './eatsplorer-list.component.html',
  styleUrls: ['./eatsplorer-list.component.css'],
})
export class EatsplorerListComponent implements OnInit {
  @Input() filteredRecipes!: Recipe[];

  constructor(
    private recipeService: RecipeService,
    private shoppingService: ShoppingListService
  ) {}

  ngOnInit(): void {
    this.filteredRecipes = [];
  }
}
