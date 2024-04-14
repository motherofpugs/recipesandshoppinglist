import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipebookComponent } from './recipebook.component';

describe('RecipebookComponent', () => {
  let component: RecipebookComponent;
  let fixture: ComponentFixture<RecipebookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipebookComponent]
    });
    fixture = TestBed.createComponent(RecipebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
