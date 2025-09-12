import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../service/register';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
})
export class Registro {
  mostrarError: boolean = false;
  mostrarExito: boolean = false;
  mensajeError: string = '';

  constructor(private authService: AuthService) {}

  registrar(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!name || !email || !password) {
      this.mostrarError = true;
      this.mensajeError = 'Todos los campos son obligatorios';
      setTimeout(() => (this.mostrarError = false), 3000);
      return;
    }

    // Llamada al backend para crear usuario
    this.authService.register(name, email, password).subscribe({
      next: (res) => {
        if (res.result === 'fine') {
          this.mostrarExito = true;
          this.mostrarError = false;
          setTimeout(() => (this.mostrarExito = false), 3000);
        } else {
          this.mostrarError = true;
          this.mensajeError = res.message;
          setTimeout(() => (this.mostrarError = false), 3000);
        }
      },
      error: (err) => {
        this.mostrarError = true;
        this.mensajeError = 'Error en el servidor';
        setTimeout(() => (this.mostrarError = false), 3000);
      }
    });
  }
}
