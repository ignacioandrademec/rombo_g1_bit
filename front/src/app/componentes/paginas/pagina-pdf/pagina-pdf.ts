import { Component, inject } from '@angular/core';
import { GenerarPdf } from '../generar-pdf/generar-pdf';
import { LlamarComponente } from '../../../service/llamar-componente';
import Swal from 'sweetalert2';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-pagina-pdf',
  imports: [GenerarPdf, NgFor],
  templateUrl: './pagina-pdf.html',
  styleUrl: './pagina-pdf.css'
})
export class PaginaPDF {
  llamarComp = inject(LlamarComponente)
  ventanas: number[] = [1]

  generarCasilla(){
    if(this.ventanas.length < 5){
      this.ventanas.push(this.ventanas.length + 1);
      this.llamarComp.configArray(this.ventanas)
      console.log(this.ventanas);
    } else {
      Swal.fire({
        icon: "error",
        title: "lo sentimos",
        text: "solo puedes generar hasta 5 graficos a la vez",
      });
    }
  }

  eliminarCasilla(){
    if(this.ventanas.length != 1){
      this.ventanas.splice(this.ventanas.length - 1, 1);
      this.llamarComp.configArray(this.ventanas)
      console.log(this.ventanas);
    } else {
      Swal.fire({
        icon: "error",
        title: "error",
        text: "ya no puedes eliminar mas casillas",
      });
    }
  }
}
