import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { valHooks } from 'jquery';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shared/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  itemForm!: FormGroup;
  itemSub!: Subscription;
  editMode: boolean = false;
  editedItemI!: string;
  selectedItem!: Ingredient;
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.itemForm = new FormGroup({
      itemName: new FormControl('', Validators.required),
      itemAmount: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[1-9]\d*$/),
      ]),
    });
    this.shoppingListService.selectedItem.subscribe({
      next: (index?: string) => {
        if (index) {
          this.editedItemI = index;
          this.editMode = true;
          const selectedItem = this.shoppingListService.ingredients.find(
            (item) => item.id === index
          );
          if (selectedItem) {
            this.itemForm.setValue({
              itemName: selectedItem.name,
              itemAmount: selectedItem.amount,
            });
            this.selectedItem = selectedItem;
          } else {
            console.error(`Item with ID ${index} not found.`);
          }
        }
      },
    });
  }

  addorUpdateItem() {
    if (this.editMode) {
      this.shoppingListService.updateIngreditent();
    } else {
      this.shoppingListService.addItem({
        name: this.itemForm.get('itemName')?.value,
        amount: this.itemForm.get('itemAmount')?.value,
      });
    }
    this.editMode = false;
    this.itemForm.reset();
  }
  fillSelectedItem() {
    this.itemForm.setValue(this.shoppingListService.selectItem);
  }

  onClear() {
    this.itemForm.reset();
    this.editMode = false;
  }

  deleteItem() {
    if (this.editMode) {
      this.shoppingListService.deleteItem(this.editedItemI);
      this.onClear();
    }
  }

  ngOnDestroy(): void {}
}
