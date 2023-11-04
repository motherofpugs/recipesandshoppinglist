import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'recipesandshoppinglist';
  selectedFeature?: string;

  navigate(feature: string) {
    this.selectedFeature = feature;
  }
}
