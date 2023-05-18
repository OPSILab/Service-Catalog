import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueSelectComponent } from './catalogue-select.component';

describe('CatalogueSelectComponent', () => {
  let component: CatalogueSelectComponent;
  let fixture: ComponentFixture<CatalogueSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogueSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogueSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
