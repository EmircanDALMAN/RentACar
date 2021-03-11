import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowweworkComponent } from './howwework.component';

describe('HowweworkComponent', () => {
  let component: HowweworkComponent;
  let fixture: ComponentFixture<HowweworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HowweworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HowweworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
