import { TestBed } from '@angular/core/testing';

import { EatsplorerService } from './eatsplorer.service';

describe('EatsplorerService', () => {
  let service: EatsplorerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EatsplorerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
