import { TestBed } from '@angular/core/testing';

import { AuthHistorialGuard } from './auth-historial.guard';

describe('AuthHistorialGuard', () => {
  let guard: AuthHistorialGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthHistorialGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
