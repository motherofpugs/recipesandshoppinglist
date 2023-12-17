import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { RecipeService } from 'src/app/shared/recipe.service';
import { Recipe } from '../../recipe.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-start2',
  templateUrl: './recipe-start2.component.html',
  styleUrls: ['./recipe-start2.component.css'],
})
export class RecipeStart2Component implements OnInit {
  selectedIndex: number = 0;
  recipes: Recipe[] = [];

  @ViewChild('recipesContainer') recipesContainer!: ElementRef;

  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit(): void {
    this.recipeService.recipesChanged$.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
    this.recipeService.getRecipes();
  }

  nextImg() {
    if (this.selectedIndex < this.recipes.length - 1) {
      this.selectedIndex++;
      this.scrollToCurrentCard();
    } else {
      this.selectedIndex = 0;
      this.scrollToCurrentCard();
    }
  }

  prevImg() {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
      this.scrollToCurrentCard();
    } else {
      this.selectedIndex = this.recipes.length;
      this.scrollToCurrentCard();
    }
  }

  scrollToCurrentCard() {
    const cardWidth =
      this.recipesContainer.nativeElement.querySelector(
        '.recipe-card'
      ).offsetWidth;
    this.recipesContainer.nativeElement.scrollLeft =
      this.selectedIndex * cardWidth;
  }

  onClickRecipe(id: number) {
    this.router.navigate([`recipes/${id}`]);
  }
}
