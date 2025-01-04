import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/product';  // Asegúrate de que la ruta es correcta

@Injectable({
  providedIn: 'root'
})
export class HomeproductService {
  private apiUrl = 'http://localhost:5220/api/Product/available';  // Ruta correcta

  constructor(private http: HttpClient) { }

  getProducts(filter: string = '', type: string = '', order: string = 'asc', page: number = 1): Observable<ApiResponse> {
    const params = new HttpParams({
      fromObject: { filter, type, sortOrder: order, pageNumber: page.toString(), pageSize: '10' }
    });
    return this.http.get<ApiResponse>(this.apiUrl, { params });
  }
}
