import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/product'; // Verifica que la ruta sea correcta

@Injectable({
  providedIn: 'root',
})
export class HomeproductService {
  private apiUrl = 'http://localhost:5220/api/Product/available'; // Ruta base del endpoint

  constructor(private http: HttpClient) {}

  // Método para obtener productos disponibles
  getAvailableProducts(
    searchQuery?: string,
    type?: string,
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 10
  ): Observable<ApiResponse> {
    let params = new HttpParams();

    if (searchQuery) params = params.set('searchQuery', searchQuery);
    if (type && type !== 'all') params = params.set('type', type);
    params = params.set('sortOrder', sortOrder);
    params = params.set('pageNumber', pageNumber.toString());
    params = params.set('pageSize', pageSize.toString());

    return this.http.get<ApiResponse>(this.apiUrl, { params });
  }


}
