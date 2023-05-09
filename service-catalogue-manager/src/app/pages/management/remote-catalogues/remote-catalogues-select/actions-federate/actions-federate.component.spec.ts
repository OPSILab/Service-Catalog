import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsFederateComponent } from './actions-federate.component';

describe('ActionsFederateComponent', () => {
  let component: ActionsFederateComponent;
  let fixture: ComponentFixture<ActionsFederateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionsFederateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsFederateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
