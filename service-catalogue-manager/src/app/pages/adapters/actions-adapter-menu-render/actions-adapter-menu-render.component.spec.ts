import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsAdapterMenuRenderComponent } from './actions-adapter-menu-render.component';

describe('ActionsAdapterMenuRenderComponent', () => {
  let component: ActionsAdapterMenuRenderComponent;
  let fixture: ComponentFixture<ActionsAdapterMenuRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionsAdapterMenuRenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsAdapterMenuRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
