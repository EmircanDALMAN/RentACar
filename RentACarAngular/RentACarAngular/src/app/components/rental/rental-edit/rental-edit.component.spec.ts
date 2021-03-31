import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalEditComponent } from './rental-edit.component';

describe('RentalEditComponent', () => {
  let component: RentalEditComponent;
  let fixture: ComponentFixture<RentalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentalEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
