import { TestBed } from '@angular/core/testing';

import { SubirArchivo } from './subir-archivo';

describe('SubirArchivo', () => {
  let service: SubirArchivo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubirArchivo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
