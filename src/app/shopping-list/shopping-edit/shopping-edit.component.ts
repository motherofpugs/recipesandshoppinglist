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
  editedItemI!: number;
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
    this.itemSub = this.shoppingListService.selectedItem.subscribe(
      (index: number) => {
        this.editedItemI = index;
        this.editMode = true;
        this.selectedItem = this.shoppingListService.selectItem(index);
        this.itemForm.setValue({
          itemName: this.selectedItem.name,
          itemAmount: this.selectedItem.amount,
        });
      }
    );
  }

  addorUpdateItem() {
    if (this.editMode) {
      this.shoppingListService.updateIngreditent(this.editedItemI, {
        name: this.itemForm.get('itemName')?.value,
        amount: this.itemForm.get('itemAmount')?.value,
      });
    } else {
      this.shoppingListService.addItem(
        this.itemForm.get('itemName')?.value,
        this.itemForm.get('itemAmount')?.value
      );
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

  ngOnDestroy(): void {
    this.itemSub.unsubscribe();
  }
}
