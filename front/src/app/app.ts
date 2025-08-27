import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navegador } from './componentes/compartido/navegador/navegador';
import { PieDePagina } from './componentes/compartido/pie-de-pagina/pie-de-pagina';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navegador, PieDePagina],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('front');
}
