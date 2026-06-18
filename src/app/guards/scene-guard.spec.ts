import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { sceneGuard } from './scene-guard';

describe('sceneGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => sceneGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
