import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueInfoComponent } from './catalogue-info.component';

describe('CatalogueInfoComponent', () => {
  let component: CatalogueInfoComponent;
  let fixture: ComponentFixture<CatalogueInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogueInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogueInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
