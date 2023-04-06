import { TestBed } from '@angular/core/testing';

import { AvailableCataloguesService } from './availableCatalogues.service';

describe('AvailableCataloguesService', () => {
  let service: AvailableCataloguesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailableCataloguesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

