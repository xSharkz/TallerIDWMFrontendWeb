import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/product';  // Asegúrate de que la ruta es correcta

@Injectable({
  providedIn: 'root'
})
export class HomeproductService {
  private apiUrl = "http://localhost:5220/api/Product/";

  constructor(private http: HttpClient) { }

  getProducts(filter: string = '', type: string = '', order: string = '', page: number = 1): Observable<ApiResponse> {
    const params = new HttpParams({ fromObject: { filter, type, order, page: page.toString() }});
    return this.http.get<ApiResponse>(`${this.apiUrl}available`, { params });
  }
}
