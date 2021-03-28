import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindeksComponent } from './findeks.component';

describe('FindeksComponent', () => {
  let component: FindeksComponent;
  let fixture: ComponentFixture<FindeksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindeksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindeksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
