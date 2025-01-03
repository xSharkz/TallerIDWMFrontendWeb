import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeproductService {
  private apiUrl = "http://localhost:5220/api/Product/"
  constructor(private http: HttpClient) { }
  getProducts(filter: string = '', type: string = '', order: string = '', page: number = 1): Observable<any>{
    const params = {filter, type, order, page: page.toString() }
    return this.http.get(this.apiUrl,{params});
  }
}
