import { Component } from '@angular/core';

@Component({
  selector: 'app-recipebook',
  templateUrl: './recipebook.component.html',
  styleUrls: ['./recipebook.component.css'],
})
export class RecipebookComponent {
  recipeSelected!: boolean;

  handleRecipeSelected() {
    this.recipeSelected = true;
  }
}
