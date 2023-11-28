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
import { Router } from '@angular/router';
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
  selectedItem!: Ingredient;
  editMode: boolean = false;

  constructor(
    private shoppingListService: ShoppingListService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.itemForm = new FormGroup({
      name: new FormControl('', Validators.required),
      amount: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[1-9]\d*$/),
      ]),
    });
    this.shoppingListService.selectedItem.subscribe({
      next: (item: Ingredient) => {
        if (item && this.itemForm) {
          this.editMode = true;
          console.log(item);
          this.selectedItem = item;
          this.itemForm.patchValue(item);
        }
      },
    });
  }

  addorUpdateItem() {
    const newItem = this.itemForm.value;
    if (this.selectedItem && this.editMode) {
      newItem.id = this.selectedItem.id;
      this.shoppingListService.updateIngreditent(newItem);
      this.onClear();
    } else {
      this.shoppingListService.addItem(newItem);
    }
  }

  onClear() {
    this.editMode = false;
    this.itemForm.reset();
  }

  deleteItem(id?: string) {
    if (id) this.shoppingListService.deleteItem(id);
    this.onClear();
  }

  ngOnDestroy(): void {}
}
