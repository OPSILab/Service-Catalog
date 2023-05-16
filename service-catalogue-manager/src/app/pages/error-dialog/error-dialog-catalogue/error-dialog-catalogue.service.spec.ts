/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ErrorDialogCatalogueService } from './error-dialog-catalogue.service';

describe('Service: ErrorDialogCatalogue', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorDialogCatalogueService]
    });
  });

  it('should ...', inject([ErrorDialogCatalogueService], (service: ErrorDialogCatalogueService) => {
    expect(service).toBeTruthy();
  }));
});
