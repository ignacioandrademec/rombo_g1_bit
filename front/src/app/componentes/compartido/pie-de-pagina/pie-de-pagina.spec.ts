import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieDePagina } from './pie-de-pagina';

describe('PieDePagina', () => {
  let component: PieDePagina;
  let fixture: ComponentFixture<PieDePagina>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PieDePagina]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieDePagina);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
