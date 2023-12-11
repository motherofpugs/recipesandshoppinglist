import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeStart2Component } from './recipe-start2.component';

describe('RecipeStart2Component', () => {
  let component: RecipeStart2Component;
  let fixture: ComponentFixture<RecipeStart2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeStart2Component]
    });
    fixture = TestBed.createComponent(RecipeStart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
