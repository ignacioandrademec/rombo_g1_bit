import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = 'http://localhost:3000/user'; 
  private router = inject(Router)

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.URL}/login`, { email, password });
  }

  getPerfil(): Observable<any> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.URL}/perfil`, { headers });
  }

  iniciarSesion(){
    if (localStorage.getItem("token")) {
      return true
    } else {
      return false
    }
  }

  cerrarSesion(){
    localStorage.removeItem("token")
    this.router.navigate(["/"])
    window.location.reload()
  }
}
