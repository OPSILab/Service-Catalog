import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveMapAndadapterComponent } from './save-map-andadapter.component';

describe('SaveMapAndadapterComponent', () => {
  let component: SaveMapAndadapterComponent;
  let fixture: ComponentFixture<SaveMapAndadapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveMapAndadapterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveMapAndadapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
