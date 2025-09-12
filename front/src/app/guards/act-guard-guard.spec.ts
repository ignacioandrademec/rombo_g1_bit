import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { actGuardGuard } from './act-guard-guard';

describe('actGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => actGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
