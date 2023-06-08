import { TestBed } from '@angular/core/testing';

import { EmployeeGuard } from './employee.guard';

describe('StudentGuard', () => {
  let guard: EmployeeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EmployeeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
