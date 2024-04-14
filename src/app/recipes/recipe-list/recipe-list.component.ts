import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/shared/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  @Output() recipeSelected = new EventEmitter<boolean>();

  constructor(
    private recipeServie: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataStorageService
  ) {}
  ngOnInit(): void {
    this.recipeServie.getRecipes();
    this.recipeServie.recipesChanged$.subscribe({
      next: (recipes: Recipe[]) => {
        this.recipes = recipes;
      },
    });
  }

  onSelectRecipe() {
    this.recipeSelected.emit(true);
  }
  newRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  ngOnDestroy(): void {}
}
