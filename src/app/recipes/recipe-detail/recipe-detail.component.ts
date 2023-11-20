import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shared/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/shared/recipe.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe!: Recipe;
  id!: string;
  isDropdownOpen = false;
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  constructor(
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataStorageService
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (this.id) {
        this.dataService.getRecipe(this.id).subscribe({
          next: (recipe: Recipe) => {
            this.recipe = recipe;
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }

  addToShoppingList() {
    if (this.recipe) {
      this.shoppingListService.addItemFromRecipe(this.recipe);
      this.router.navigate(['shopping-list']);
    }
  }
  editRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  deleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
  }
}
