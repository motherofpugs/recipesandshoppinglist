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

  addItem() {
    if (this.editMode) {
      this.shoppingListService.updateIngreditent(this.editedItemI, {
        name: this.itemForm.get('itemName')?.value,
        amount: this.itemForm.get('itemAmount')?.value,
      });
      console.log(this.selectedItem);
    } else {
      this.shoppingListService.addItem(
        this.itemForm.get('itemName')?.value,
        this.itemForm.get('itemAmount')?.value
      );
    }
  }
  fillSelectedItem() {
    this.itemForm.setValue(this.shoppingListService.selectItem);
  }
  ngOnDestroy(): void {
    this.itemSub.unsubscribe();
  }
}
