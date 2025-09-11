import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true, // ✅ necesario para usar imports
  imports: [CommonModule], // ✅ aquí agregamos CommonModule para *ngIf
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  mostrarError: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  login(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const usuario = formData.get('usuario') as string;
    const password = formData.get('password') as string;

    this.authService.login(usuario, password).subscribe({
      next: (res) => {
        localStorage.setItem('userId', res.data);
        this.router.navigate(['/principal']);
      },
      error: () => {
        this.mostrarError = true;
        setTimeout(() => (this.mostrarError = false), 3000);
      }
    });
  }
}
