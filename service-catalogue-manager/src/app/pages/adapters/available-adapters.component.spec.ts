import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableAdaptersComponent } from './available-adapters.component';

describe('AvailableAdaptersComponent', () => {
  let component: AvailableAdaptersComponent;
  let fixture: ComponentFixture<AvailableAdaptersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableAdaptersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableAdaptersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

