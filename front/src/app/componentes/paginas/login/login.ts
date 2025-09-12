import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
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

    // 🔹 Cambiado a email para coincidir con el backend
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    this.authService.login(email, password).subscribe({
      next: (res) => {
        if (res.result === 'fine') {
          // 🔹 Guardamos el token en localStorage
          localStorage.setItem('token', res.data);
          this.router.navigate(['/principal']);
        } else {
          this.mostrarError = true;
          setTimeout(() => (this.mostrarError = false), 3000);
          console.log(res);
          console.log(email);
          console.log(password);
        }
      },
      error: () => {
        this.mostrarError = true;
        setTimeout(() => (this.mostrarError = false), 3000);
      }
    });
  }
}
