import { TestBed } from '@angular/core/testing';

import { Marzipano } from './marzipano';

describe('Marzipano', () => {
  let service: Marzipano;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Marzipano);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
