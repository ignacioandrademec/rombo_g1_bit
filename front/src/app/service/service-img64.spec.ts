import { TestBed } from '@angular/core/testing';

import { ServiceImg64 } from './service-img64';

describe('ServiceImg64', () => {
  let service: ServiceImg64;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceImg64);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
