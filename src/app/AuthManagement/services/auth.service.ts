import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Servicio de autenticación para manejar operaciones relacionadas con el inicio de sesión,
 * registro y cierre de sesión de los usuarios.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /** URL base de la API de autenticación */
  private apiUrl = 'http://localhost:5220/api/Auth';

  /**
   * Constructor que inyecta el cliente HTTP para realizar solicitudes a la API.
   * @param http - Servicio HttpClient para manejar solicitudes HTTP.
   */
  constructor(private http: HttpClient) {}

  /**
   * Inicia sesión con las credenciales proporcionadas.
   * @param formData - Formulario con las credenciales del usuario (email y contraseña).
   * @returns Observable con la respuesta de la API.
   */
  login(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, formData);
  }

  /**
   * Registra un nuevo usuario con la información proporcionada.
   * @param userData - Formulario con los datos del usuario para el registro.
   * @returns Observable con la respuesta de la API.
   */
  register(userData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  /**
   * Cierra sesión del usuario actual eliminando el token de autenticación almacenado.
   */
  logout(): void {
    localStorage.removeItem('token');
  }
}
