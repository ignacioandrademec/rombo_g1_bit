import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObtenerArchivo {
  private httpClient = inject(HttpClient)
  private URL = "http://localhost:3000/info/getInfo"

  obtenerArchivo(id:string){
    return this.httpClient.get(`${this.URL}/${id}`)
  }
}
