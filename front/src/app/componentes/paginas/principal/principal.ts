import { Component } from '@angular/core';

@Component({
  selector: 'app-principal',
  imports: [],
  templateUrl: './principal.html',
  styleUrl: './principal.css'
})
export class Principal {
  meses = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"]
  resultado = this.meses.slice(0, -3)
  resultado2 = this.resultado.slice(2)



enviar(){

}

}
