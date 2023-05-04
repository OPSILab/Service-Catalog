import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageConfigurationsComponent } from './manage-configurations.component';

describe('ManageConfigurationsComponent', () => {
  let component: ManageConfigurationsComponent;
  let fixture: ComponentFixture<ManageConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageConfigurationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
