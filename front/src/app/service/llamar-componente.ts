import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LlamarComponente {
  ventanas: number[] = []
  valor: any = {}
  

  /* abrir/cerrar ventana */
  configArray(array:number[]){
    this.ventanas = array
      this.valor[`ventana${1}`] = false
      this.valor[`ventana${2}`] = false
      this.valor[`ventana${3}`] = false
      this.valor[`ventana${4}`] = false
      this.valor[`ventana${5}`] = false
  }

  
  
  /* transferir informacion */
  private id = new BehaviorSubject<string>("");
  idTransfer = this.id.asObservable();

  enviarId(data:string){
    this.id.next(data)
  }
}
