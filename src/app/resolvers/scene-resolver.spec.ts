import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { sceneResolver } from './scene-resolver';

describe('sceneResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => sceneResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
