import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorDialogCatalogueComponent } from './error-dialog-catalogue.component';

describe('ErrorDialogCatalogueComponent', () => {
  let component: ErrorDialogCatalogueComponent;
  let fixture: ComponentFixture<ErrorDialogCatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorDialogCatalogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorDialogCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
