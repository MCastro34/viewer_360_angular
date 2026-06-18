import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hotspots } from './hotspots';

describe('Hotspots', () => {
  let component: Hotspots;
  let fixture: ComponentFixture<Hotspots>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hotspots],
    }).compileComponents();

    fixture = TestBed.createComponent(Hotspots);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
