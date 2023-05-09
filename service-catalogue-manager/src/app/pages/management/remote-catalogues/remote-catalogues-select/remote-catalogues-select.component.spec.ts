import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteCataloguesSelectComponent } from './remote-catalogues-select.component';

describe('RemoteCataloguesSelectComponent', () => {
  let component: RemoteCataloguesSelectComponent;
  let fixture: ComponentFixture<RemoteCataloguesSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoteCataloguesSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteCataloguesSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
