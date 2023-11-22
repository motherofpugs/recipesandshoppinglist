import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../shared/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public loggedInStatus$?: Observable<boolean | null>;
  public userEmail$?: Observable<string | null>;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {
    this.loggedInStatus$ = this.authService.loggenInStatus$;
    this.userEmail$ = this.authService.userEmail$;
  }
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

  async logout(): Promise<void> {
    await this.authService.logout();
    console.log('Logged out');
  }
}
