import { Component, inject, Input } from '@angular/core';
import { SubirArchivo } from '../../../service/subir-archivo';
import { ObtenerArchivo } from '../../../service/obtener-archivo';
import { ComponentePDF } from '../componente-pdf/componente-pdf';
import { LlamarComponente } from '../../../service/llamar-componente';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-generar-pdf',
  imports: [ComponentePDF, FormsModule, CommonModule ],
  templateUrl: './generar-pdf.html',
  styleUrl: './generar-pdf.css'
})
export class GenerarPdf {
selectedFile: File | null = null;
subirArchivo = inject(SubirArchivo)
obtenerArchivo = inject(ObtenerArchivo)
llamarComponente = inject(LlamarComponente)
file:any
cat!: string
graficoNombre:string = ""
@Input() array: number[] = []
infoData:string = "" 

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log(this.selectedFile);
    }
  }

  uploadFile(): void {
    if (!this.selectedFile || !this.cat || !this.graficoNombre) {
      Swal.fire({
        title: "campo vacio",
        text: "por favor llene todos los campos",
        icon: "question"
      });
      return;
    } else {
        Swal.fire({
          title: "se envio el archivo correctamente",
          icon: "success",
        });
  
        const formData = new FormData();
        formData.append('file', this.selectedFile);
  
        this.subirArchivo.sendFile(formData).subscribe((res:any)=>{
          console.log(res);
          this.infoData = res.datosFinancieros._id
          console.log(this.infoData);
        });
      
    }
  }

  crearGrafico(){
    if(this.infoData){
        this.llamarComponente.valor = true
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "envia un archivo primero",
      });
    }
  }
}
