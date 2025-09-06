import { TestBed } from '@angular/core/testing';

import { LlamarComponente } from './llamar-componente';

describe('LlamarComponente', () => {
  let service: LlamarComponente;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LlamarComponente);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
