import { TestBed } from '@angular/core/testing';

import { ManageConfigurationsService } from './manage-configurations.service';

describe('ManageConfigurationsService', () => {
  let service: ManageConfigurationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageConfigurationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
