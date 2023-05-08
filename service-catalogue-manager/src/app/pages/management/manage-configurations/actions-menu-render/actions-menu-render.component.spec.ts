import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsMenuRenderComponent } from './actions-menu-render.component';

describe('ActionsMenuRenderComponent', () => {
  let component: ActionsMenuRenderComponent;
  let fixture: ComponentFixture<ActionsMenuRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionsMenuRenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsMenuRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
