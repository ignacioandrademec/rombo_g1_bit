import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarPdf } from './generar-pdf';

describe('GenerarPdf', () => {
  let component: GenerarPdf;
  let fixture: ComponentFixture<GenerarPdf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerarPdf]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerarPdf);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
