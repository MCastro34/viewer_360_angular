import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Extended } from './extended';

describe('Extended', () => {
  let component: Extended;
  let fixture: ComponentFixture<Extended>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Extended],
    }).compileComponents();

    fixture = TestBed.createComponent(Extended);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
