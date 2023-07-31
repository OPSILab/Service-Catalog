import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdapterComponent } from './add-adapter.component';

describe('AddAdapterComponent', () => {
  let component: AddAdapterComponent;
  let fixture: ComponentFixture<AddAdapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdapterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

