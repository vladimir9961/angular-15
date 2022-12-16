import { TestBed } from '@angular/core/testing';

import { NLoggedGuard } from './n-logged.guard';

describe('NLoggedGuard', () => {
  let guard: NLoggedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NLoggedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
