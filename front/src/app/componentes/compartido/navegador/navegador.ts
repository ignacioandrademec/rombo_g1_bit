import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../service/auth';

@Component({
  selector: 'app-navegador',
  imports: [RouterLink],
  templateUrl: './navegador.html',
  styleUrl: './navegador.css'
})
export class Navegador {
  auth = inject(AuthService)
}
