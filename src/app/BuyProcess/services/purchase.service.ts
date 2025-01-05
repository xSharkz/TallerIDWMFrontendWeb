import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private apiUrl= 'http://localhost:5220/api/Order';
  constructor(private http: HttpClient) { }


    confirmOrder(order: { deliveryAddress: string; orderItems: any[]; totalAmount: number }): Observable<any> {
      return this.http.post(`${this.apiUrl}/orders`, order);
    }

    getOrders(): Observable<any> {
      return this.http.get(`${this.apiUrl}/orders`);
    }
}
