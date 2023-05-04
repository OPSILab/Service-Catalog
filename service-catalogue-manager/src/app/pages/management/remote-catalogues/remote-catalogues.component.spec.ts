import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteCataloguesComponent } from './remote-catalogues.component';

describe('RemoteCataloguesComponent', () => {
  let component: RemoteCataloguesComponent;
  let fixture: ComponentFixture<RemoteCataloguesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoteCataloguesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteCataloguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
