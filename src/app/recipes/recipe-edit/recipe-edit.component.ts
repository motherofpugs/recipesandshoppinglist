import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeService } from 'src/app/shared/recipe.service';
import { Recipe } from '../recipe.model';
import { Location } from '@angular/common';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id!: string;
  editMode = false;
  recipeForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private location: Location,
    private dataService: DataStorageService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'];
      this.initForm();
    });
  }

  private initForm() {
    let recipe: Recipe;
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray<FormGroup>([]);
    if (this.editMode) {
      this.dataService.getRecipe(this.id).subscribe({
        next: (recipe: Recipe) => {
          (recipe = recipe),
            (recipeName = recipe.name),
            (recipeImagePath = recipe.imagePath);
          recipeDescription = recipe.desc;
          this.recipeForm.patchValue(recipe);

          if (recipe['ingredients']) {
            for (let ingredient of recipe.ingredients as Ingredient[]) {
              let ingredientFormGroup = new FormGroup({
                name: new FormControl(ingredient.name, [Validators.required]),
                amount: new FormControl(ingredient.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9]\d*$/),
                ]),
              });

              recipeIngredients.push(ingredientFormGroup);
            }
          }
        },
      });
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, [Validators.required]),
      imagePath: new FormControl(recipeImagePath, [Validators.required]),
      desc: new FormControl(recipeDescription, [Validators.required]),
      ingredients: recipeIngredients,
    });
  }
  onSubmit() {
    const newRecipe: Recipe = this.recipeForm.value;
    if (this.editMode) {
      newRecipe.id = this.id;
      this.recipeService.updateRecipe(newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
    this.onCancel();
  }
  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]\d*$/),
        ]),
      })
    );
  }

  onCancel() {
    this.location.back();
  }
  ondeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  trackByFn(index: number, control: AbstractControl): number {
    return index;
  }
}
