import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: number[] = []; // IDs de los productos en el carrito

  addToCart(productId: number): void {
    this.cart.push(productId);
    console.log('Producto añadido al carrito:', productId);
    console.log('Carrito actualizado:', this.cart);
  }
}
