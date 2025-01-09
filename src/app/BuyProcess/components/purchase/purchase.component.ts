import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PurchaseService } from '../../services/purchase.service';

/**
 * Componente para gestionar la vista y la lógica del proceso de compra.
 */
@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class PurchaseComponent {
  /**
   * Dirección de entrega para la orden.
   */
  address = {
    country: '',
    city: '',
    commune: '',
    street: '',
  };

  /**
   * Lista de productos incluidos en la orden.
   */
  orderItems = [
    { productId: 1, name: 'Producto A', quantity: 2, unitPrice: 5000 },
    { productId: 2, name: 'Producto B', quantity: 3, unitPrice: 15000 },
  ];

  /**
   * Constructor que inyecta las dependencias necesarias.
   * @param router - Servicio para la navegación entre rutas.
   * @param purchaseService - Servicio para gestionar la compra (reservado para futuras funcionalidades).
   */
  constructor(private router: Router, private purchaseService: PurchaseService) {}

  /**
   * Calcula el monto total de la orden sumando el precio total de cada artículo.
   * @returns El monto total de la orden.
   */
  getTotal(): number {
    return this.orderItems.reduce((total, item) => total + item.quantity * item.unitPrice, 0);
  }

  /**
   * Confirma la compra verificando que la dirección esté completa y redirige a la página de agradecimiento.
   * En el futuro, se puede integrar con un servicio para registrar la compra en el backend.
   */
  confirmPurchase(): void {
    if (!this.address.country || !this.address.city || !this.address.commune || !this.address.street) {
      alert('Por favor, complete todos los campos de la dirección de entrega.');
      return;
    }

    const deliveryAddress = `${this.address.country}, ${this.address.city}, ${this.address.commune}, ${this.address.street}`;
    const totalAmount = this.getTotal();

    const order = {
      deliveryAddress,
      orderItems: this.orderItems,
      totalAmount,
    };

    console.log('Orden confirmada:', order);

    // Redirige a la página de agradecimiento
    this.router.navigate(['/thank-you']);
  }
}
