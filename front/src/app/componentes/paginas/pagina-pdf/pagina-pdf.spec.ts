import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaPDF } from './pagina-pdf';

describe('PaginaPDF', () => {
  let component: PaginaPDF;
  let fixture: ComponentFixture<PaginaPDF>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaPDF]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaPDF);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
