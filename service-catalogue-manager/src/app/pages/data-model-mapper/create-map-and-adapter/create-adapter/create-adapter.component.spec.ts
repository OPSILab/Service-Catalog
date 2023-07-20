import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdapterComponent } from './create-adapter.component';

describe('CreateAdapterComponent', () => {
  let component: CreateAdapterComponent;
  let fixture: ComponentFixture<CreateAdapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAdapterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAdapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
