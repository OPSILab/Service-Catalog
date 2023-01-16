import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdapterInfoRenderComponent } from './adapter-info-render.component';

describe('AdapterInfoRenderComponent', () => {
  let component: AdapterInfoRenderComponent;
  let fixture: ComponentFixture<AdapterInfoRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdapterInfoRenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdapterInfoRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
