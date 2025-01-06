import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/product'; // Interfaz que describe la estructura de la respuesta de la API.

/**
 * Servicio para interactuar con la API de productos disponibles.
 */
@Injectable({
  providedIn: 'root', // Hace que el servicio esté disponible globalmente en la aplicación.
})
export class HomeproductService {
  /**
   * URL base del endpoint para obtener productos disponibles.
   */
  private apiUrl = 'http://localhost:5220/api/Product/available';

  /**
   * Constructor del servicio que inyecta el cliente HTTP para realizar solicitudes.
   * @param http - Servicio HttpClient para manejar solicitudes HTTP.
   */
  constructor(private http: HttpClient) {}

  /**
   * Obtiene productos disponibles desde la API con filtros y paginación.
   * @param searchQuery - Filtro opcional para buscar productos por nombre.
   * @param type - Filtro opcional para buscar productos por tipo.
   * @param sortOrder - Orden de los resultados ('asc' o 'desc'). Por defecto es 'asc'.
   * @param pageNumber - Número de la página a consultar. Por defecto es 1.
   * @param pageSize - Número de productos por página. Por defecto es 10.
   * @returns Un observable que emite la respuesta de la API en formato `ApiResponse`.
   */
  getAvailableProducts(
    searchQuery?: string,
    type?: string,
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 10
  ): Observable<ApiResponse> {
    let params = new HttpParams();

    // Agrega los parámetros opcionales a la consulta.
    if (searchQuery) params = params.set('searchQuery', searchQuery);
    if (type && type !== 'all') params = params.set('type', type);
    params = params.set('sortOrder', sortOrder);
    params = params.set('pageNumber', pageNumber.toString());
    params = params.set('pageSize', pageSize.toString());

    // Realiza la solicitud GET con los parámetros configurados.
    return this.http.get<ApiResponse>(this.apiUrl, { params });
  }
}
