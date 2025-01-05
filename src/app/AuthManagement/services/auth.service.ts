import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl ='http://localhost:5220/api/Auth/'
  constructor(private http: HttpClient) { }

  login(credentials:{ email:string; password: string}): Observable<any>{
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
  register(userData: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  logout(): void{
    localStorage.removeItem('token');
  }
}
