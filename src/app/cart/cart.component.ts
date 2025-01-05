import { Component, OnInit } from '@angular/core';
import { CartService } from './../cart/services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  imports: [CommonModule],
  providers: [CartService],
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private CartService: CartService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.CartService.getCartItems().subscribe((data) => {
      this.cartItems = data.items;
      this.calculateTotal();
    });
  }

  calculateTotal(): void {
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  updateQuantity(productId: string, quantity: number): void {
    this.CartService.updateCartItem(productId, quantity).subscribe(() => {
      this.loadCartItems();
    });
  }

  deleteItem(productId: string): void {
    this.CartService.deleteCartItem(productId).subscribe(() => {
      this.loadCartItems();
    });
  }

  checkout(): void {
    alert('Debe iniciar sesión para realizar el pago.');
  }
}
