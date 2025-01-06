import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Servicio para manejar operaciones relacionadas con compras.
 */
@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  /**
   * URL base para las solicitudes relacionadas con pedidos.
   */
  private apiUrl = 'http://localhost:5220/api/Order';

  /**
   * Constructor del servicio.
   * @param http Cliente HTTP para realizar solicitudes al backend.
   */
  constructor(private http: HttpClient) {}

  /**
   * Confirma un pedido enviándolo al backend.
   * @param order Objeto que contiene los detalles del pedido.
   * - `deliveryAddress`: Dirección de entrega del pedido.
   * - `orderItems`: Array con los detalles de los artículos del pedido.
   * - `totalAmount`: Monto total del pedido.
   * @returns Observable que emite la respuesta del servidor.
   */
  confirmOrder(order: { deliveryAddress: string; orderItems: any[]; totalAmount: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders`, order);
  }

  /**
   * Obtiene la lista de pedidos desde el backend.
   * @returns Observable que emite la lista de pedidos.
   */
  getOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/orders`);
  }
}
