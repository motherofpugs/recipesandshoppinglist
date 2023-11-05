import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shared/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent {
  @ViewChild('nameInput', { static: false }) nameInputRef?: ElementRef;
  @ViewChild('amountInput', { static: false }) amountInputRef?: ElementRef;
  constructor(private shoppingListService: ShoppingListService) {}

  addItem() {
    this.shoppingListService.addItem(
      this.nameInputRef?.nativeElement.value,
      this.amountInputRef?.nativeElement.value
    );
  }
}
