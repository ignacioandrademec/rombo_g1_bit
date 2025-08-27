import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentePDF } from './componente-pdf';

describe('ComponentePDF', () => {
  let component: ComponentePDF;
  let fixture: ComponentFixture<ComponentePDF>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentePDF]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentePDF);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
