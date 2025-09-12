import { Component } from '@angular/core';
import { GenerarPdf } from '../generar-pdf/generar-pdf';

@Component({
  selector: 'app-pagina-pdf',
  imports: [GenerarPdf],
  templateUrl: './pagina-pdf.html',
  styleUrl: './pagina-pdf.css'
})
export class PaginaPDF {
}
