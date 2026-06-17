import { TestBed } from '@angular/core/testing';

import { Webtitle } from './webtitle';

describe('Webtitle', () => {
  let service: Webtitle;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Webtitle);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
