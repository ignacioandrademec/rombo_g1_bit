import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LlamarComponente {
  /* abrir/cerrar ventana */
  valor:boolean = false
  /* transferir informacion */
  private id = new BehaviorSubject<string>("");
  idTransfer = this.id.asObservable();

  enviarId(data:string){
    this.id.next(data)
  }
}
