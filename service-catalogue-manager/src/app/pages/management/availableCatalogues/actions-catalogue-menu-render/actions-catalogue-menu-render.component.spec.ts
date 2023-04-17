import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsCatalogueMenuRenderComponent } from './actions-catalogue-menu-render.component';

describe('ActionsCatalogueMenuRenderComponent', () => {
  let component: ActionsCatalogueMenuRenderComponent;
  let fixture: ComponentFixture<ActionsCatalogueMenuRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionsCatalogueMenuRenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsCatalogueMenuRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
