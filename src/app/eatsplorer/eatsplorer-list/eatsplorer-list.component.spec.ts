import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EatsplorerListComponent } from './eatsplorer-list.component';

describe('EatsplorerListComponent', () => {
  let component: EatsplorerListComponent;
  let fixture: ComponentFixture<EatsplorerListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EatsplorerListComponent]
    });
    fixture = TestBed.createComponent(EatsplorerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
