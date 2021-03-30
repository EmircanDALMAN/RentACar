import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarImageEditComponent } from './car-image-edit.component';

describe('CarImageEditComponent', () => {
  let component: CarImageEditComponent;
  let fixture: ComponentFixture<CarImageEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarImageEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarImageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
