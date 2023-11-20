import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from '../recipes/recipe.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private dataStorageService: DataStorageService) {}
  isDropdownOpen = false;
  ngOnInit() {}
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onSaveData() {}

  onFetchData() {
    this.dataStorageService.getRecipes().subscribe({
      next: (recipes: Recipe[]) => {
        console.log('Recipes have arrived');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
