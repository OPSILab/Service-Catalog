import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveRenderComponent } from './active-render.component';

describe('ActiveRenderComponent', () => {
  let component: ActiveRenderComponent;
  let fixture: ComponentFixture<ActiveRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveRenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
