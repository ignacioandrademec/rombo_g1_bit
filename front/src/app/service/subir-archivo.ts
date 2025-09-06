import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivo {
  private httpclient = inject(HttpClient)
  private URL:string = "http://localhost:3000/info/upload"

  sendFile(payload: FormData){
    return this.httpclient.post(this.URL, payload)
  }

}
