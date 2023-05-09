import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FederateCatalogueComponent } from './federate-catalogue.component';

describe('FederateCatalogueComponent', () => {
  let component: FederateCatalogueComponent;
  let fixture: ComponentFixture<FederateCatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FederateCatalogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FederateCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
