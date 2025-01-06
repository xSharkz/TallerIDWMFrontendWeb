import { Injectable } from '@angular/core';

/**
 * Servicio para manejar el carrito de compras en la aplicación.
 */
@Injectable({
  providedIn: 'root', // Hace que el servicio esté disponible globalmente en la aplicación.
})
export class CartService {
  /**
   * Almacena los IDs de los productos añadidos al carrito.
   */
  private cart: number[] = [];

  /**
   * Añade un producto al carrito.
   * @param productId - El ID del producto que se quiere añadir al carrito.
   */
  addToCart(productId: number): void {
    this.cart.push(productId); // Agrega el ID del producto al arreglo `cart`.
    console.log('Producto añadido al carrito:', productId); // Muestra en consola el producto añadido.
    console.log('Carrito actualizado:', this.cart); // Muestra el estado actualizado del carrito.
  }
}
