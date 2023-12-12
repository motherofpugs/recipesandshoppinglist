import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/shared/recipe.service';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-start2',
  templateUrl: './recipe-start2.component.html',
  styleUrls: ['./recipe-start2.component.css'],
})
export class RecipeStart2Component implements OnInit {
  selectedIndex: number = 0;
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {}
  ngOnInit(): void {
    this.recipeService.recipesChanged$.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
    this.recipeService.getRecipes();
  }

  nextImg() {
    if (this.selectedIndex >= this.recipes.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }
}
