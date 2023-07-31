import { TestBed } from '@angular/core/testing';

import { AvailableAdaptersService } from './available-adapters.service';

describe('AvailableAdaptersService', () => {
  let service: AvailableAdaptersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailableAdaptersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

