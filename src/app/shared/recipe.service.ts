import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from './ingredient.model';
import { Subject } from 'rxjs';
import { DataStorageService } from './data-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesChanged$ = new Subject<Recipe[]>();
  recipes: Recipe[] = [];
  recipeChange$ = new Subject<Recipe>();

  constructor(private dataService: DataStorageService, private router: Router) {
    this.getRecipes();
  }

  getRecipes() {
    this.dataService.getRecipes().subscribe({
      next: (recipes: Recipe[]) => {
        this.recipes = recipes;
        this.recipesChanged$.next(recipes);
      },
    });
  }
  getRecipe(id: string) {
    this.dataService.getRecipe(id).subscribe({
      complete: () => {
        this.getRecipes();
      },
    });
  }
  addRecipe(recipe: Recipe) {
    this.dataService.createRecipe(recipe).subscribe({
      complete: () => {
        this.router.navigate(['recipes']);
        this.getRecipes();
      },
    });
  }

  updateRecipe(recipe: Recipe) {
    this.dataService.updateRecipe(recipe).subscribe({
      complete: () => {
        this.getRecipes();
        this.recipesChanged$.next(this.recipes);
        this.router.navigate(['recipes']);
      },
    });
  }
  deleteRecipe(id: string) {
    this.dataService.deleteRecipe(id).subscribe({
      complete: () => {
        this.getRecipes();
        this.recipesChanged$.next(this.recipes);
        this.router.navigate(['recipes']);
      },
    });
  }
}
