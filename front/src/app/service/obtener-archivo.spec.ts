import { TestBed } from '@angular/core/testing';

import { ObtenerArchivo } from './obtener-archivo';

describe('ObtenerArchivo', () => {
  let service: ObtenerArchivo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObtenerArchivo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
