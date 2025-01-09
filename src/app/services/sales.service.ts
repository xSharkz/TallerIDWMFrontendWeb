import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private apiUrl ='http://localhost:5220/api/Auth/';

  constructor(private http: HttpClient) { }

  getVentas(page: number, limit: number, searchTerm: string, sortBy: string, sortOrder: string): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('search', searchTerm)
      .set('sortBy', sortBy)
      .set('sortOrder', sortOrder);

    return this.http.get<any>(this.apiUrl, { params });
  }
}
