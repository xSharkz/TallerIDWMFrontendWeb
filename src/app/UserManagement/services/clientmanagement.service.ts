import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientResponse } from '../interfaces/Clients';
import { tap } from 'rxjs';

/**
 * Servicio para gestionar operaciones relacionadas con los clientes.
 */
@Injectable({
  providedIn: 'root',
})
export class ClientmanagementService {
  /**
   * URL base para las solicitudes relacionadas con usuarios.
   */
  private apiUrl = 'http://localhost:5220/api/User/customers';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista de clientes según los parámetros de búsqueda y paginación.
   *
   * @param searchQuery - Texto de búsqueda para filtrar los clientes.
   * @param page - Número de la página solicitada.
   * @returns Observable de `ClientResponse` que contiene los clientes y la información de paginación.
   */
  getClients(searchQuery: string, page: number): Observable<ClientResponse> {
    const params = new HttpParams()
      .set('searchQuery', searchQuery || '') // Configura el parámetro de búsqueda.
      .set('page', page.toString()); // Configura el parámetro de la página.

    return this.http.get<ClientResponse>(`${this.apiUrl}`, { params }).pipe(
      tap(response => console.log('Respuesta de la API:', response)) // Registra la respuesta en la consola.
    );
  }

  /**
   * Cambia el estado de habilitación de un cliente.
   *
   * @param UserId - Identificador único del cliente cuyo estado se actualizará.
   * @param IsEnabled - Nuevo estado del cliente (true: habilitado, false: deshabilitado).
   * @returns Observable que indica el éxito o fallo de la operación.
   */
  toggleClientStatus(UserId: number, IsEnabled: boolean): Observable<any> {
    const formData = new FormData();
    formData.append('UserId', UserId.toString()); // Agrega el ID del usuario al formulario.
    formData.append('IsEnabled', IsEnabled.toString()); // Agrega el nuevo estado al formulario.

    return this.http.put('http://localhost:5220/api/User/update-status', formData);
  }
}
