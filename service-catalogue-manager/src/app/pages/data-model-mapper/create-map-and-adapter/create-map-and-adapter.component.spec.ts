import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMapAndAdapterComponent } from './create-map-and-adapter.component';

describe('CreateMapAndAdapterComponent', () => {
  let component: CreateMapAndAdapterComponent;
  let fixture: ComponentFixture<CreateMapAndAdapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMapAndAdapterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMapAndAdapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
