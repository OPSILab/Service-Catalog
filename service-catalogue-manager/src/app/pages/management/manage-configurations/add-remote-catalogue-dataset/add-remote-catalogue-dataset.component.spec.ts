import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRemoteCatalogueDatasetComponent } from './add-remote-catalogue-dataset.component';

describe('AddRemoteCatalogueDatasetComponent', () => {
  let component: AddRemoteCatalogueDatasetComponent;
  let fixture: ComponentFixture<AddRemoteCatalogueDatasetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRemoteCatalogueDatasetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRemoteCatalogueDatasetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
