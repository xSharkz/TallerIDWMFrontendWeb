import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PurchaseService } from '../../services/purchase.service';
@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
  imports:[CommonModule, FormsModule],
  standalone: true,
})
export class PurchaseComponent {
  address = {
    country: '',
    city: '',
    commune: '',
    street: ''
  };

  orderItems = [
    { productId: 1, name: 'Producto A', quantity: 2, unitPrice: 5000 },
    { productId: 2, name: 'Producto B', quantity: 3, unitPrice: 15000 },
  ];

  constructor(private router: Router, private purchaseService: PurchaseService) {}

  // Calcular el total de la compra
  getTotal(): number {
    return this.orderItems.reduce((total, item) => total + (item.quantity * item.unitPrice), 0);
  }

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
      totalAmount
    };

    console.log('Orden confirmada:', order);

    this.router.navigate(['/thank-you']);
  }
}
