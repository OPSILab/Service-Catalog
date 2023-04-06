import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableCataloguesComponent } from './availableCatalogues.component';

describe('AvailableCataloguesComponent', () => {
  let component: AvailableCataloguesComponent;
  let fixture: ComponentFixture<AvailableCataloguesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableCataloguesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableCataloguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

