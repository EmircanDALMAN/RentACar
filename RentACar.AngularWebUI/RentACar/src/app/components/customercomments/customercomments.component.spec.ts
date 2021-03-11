import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomercommentsComponent } from './customercomments.component';

describe('CustomercommentsComponent', () => {
  let component: CustomercommentsComponent;
  let fixture: ComponentFixture<CustomercommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomercommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomercommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
