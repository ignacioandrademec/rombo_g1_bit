import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceImg64 {
  private http = inject(HttpClient)

  async transformarImg64(image:string): Promise<string> {
    return this.http.get(`assets/${image}`,{responseType: "blob"})
      .toPromise()
      .then(blob => {
        return new Promise<string>((resolve, reject) =>{
          const leer = new FileReader()
          leer.onloadend = () => resolve(leer.result as string)
          leer.onerror = reject
          leer.readAsDataURL(blob!)
        })
      })
  }
}