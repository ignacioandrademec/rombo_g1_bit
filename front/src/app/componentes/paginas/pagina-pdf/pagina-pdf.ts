import { Component, inject } from '@angular/core';
import { SubirArchivo } from '../../../service/subir-archivo';
import { ObtenerArchivo } from '../../../service/obtener-archivo';
import { ComponentePDF } from '../componente-pdf/componente-pdf';
import { LlamarComponente } from '../../../service/llamar-componente';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pagina-pdf',
  imports: [ComponentePDF],
  templateUrl: './pagina-pdf.html',
  styleUrl: './pagina-pdf.css'
})
export class PaginaPDF {
selectedFile: File | null = null;
subirArchivo = inject(SubirArchivo)
obtenerArchivo = inject(ObtenerArchivo)
llamarComponente = inject(LlamarComponente)
infoData:string = "" 

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log(this.selectedFile);
    }
  }

  uploadFile(): void {
    if (!this.selectedFile) {
      Swal.fire({
        title: "no hay archivo",
        text: "por favor ingresa un archivo .json",
        icon: "question"
      });
      return;
    } else {
      Swal.fire({
        title: "se envio el archivo correctamente",
        icon: "success",
      });
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.subirArchivo.sendFile(formData).subscribe((res:any)=>{
      console.log(res);
      this.infoData = res.data2._id
      console.log(this.infoData);
    });
  }

  crearGrafico(){
    if(this.infoData){
      this.llamarComponente.valor = true
      this.llamarComponente.enviarId(this.infoData)
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "envia un archivo primero",
      });
    }
  }
}
