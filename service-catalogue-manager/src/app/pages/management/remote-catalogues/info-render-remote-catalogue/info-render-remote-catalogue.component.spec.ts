import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRenderRemoteCatalogueComponent } from './info-render-remote-catalogue.component';

describe('InfoRenderRemoteCatalogueComponent', () => {
  let component: InfoRenderRemoteCatalogueComponent;
  let fixture: ComponentFixture<InfoRenderRemoteCatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoRenderRemoteCatalogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoRenderRemoteCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
