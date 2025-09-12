import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegistroResponse {
  result: string;
  message: string;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/user'; 

  constructor(private http: HttpClient) {}


  register(name: string, email: string, password: string): Observable<RegistroResponse> {
    return this.http.post<RegistroResponse>(this.apiUrl, { name, email, password });
  }
}
