import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = 'http://localhost:5220/api/cart'; // URL backend

  constructor(private http: HttpClient) {}

  getCartItems(): Observable<any> {
    return this.http.get(`${this.baseUrl}/items`);
  }

  updateCartItem(productId: string, quantity: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/items/${productId}`, { quantity });
  }

  deleteCartItem(productId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/items/${productId}`);
  }

  checkout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/checkout`, {});
  }
}
