import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent {
  @ViewChild('nameInput', { static: false }) nameInputRef?: ElementRef;
  @ViewChild('amountInput', { static: false }) amountInputRef?: ElementRef;
  @Output() ingredientAdd = new EventEmitter<Ingredient>();

  addItem() {
    let ingName = this.nameInputRef?.nativeElement.value;
    let ingAmount = this.amountInputRef?.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);
    this.ingredientAdd.emit(newIngredient);
  }
}
