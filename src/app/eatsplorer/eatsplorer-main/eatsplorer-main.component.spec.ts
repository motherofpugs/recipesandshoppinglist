import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EatsplorerMainComponent } from './eatsplorer-main.component';

describe('EatsplorerMainComponent', () => {
  let component: EatsplorerMainComponent;
  let fixture: ComponentFixture<EatsplorerMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EatsplorerMainComponent]
    });
    fixture = TestBed.createComponent(EatsplorerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
