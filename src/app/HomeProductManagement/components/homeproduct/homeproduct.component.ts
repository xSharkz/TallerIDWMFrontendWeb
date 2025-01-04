import { Component, OnInit } from '@angular/core';
import { HomeproductService } from '../../services/homeproduct.service';
import { Product } from '../../interfaces/product';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { NavegationComponent } from '../navegation/navegation.component';
import { HttpClientModule } from '@angular/common/http';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-homeproduct',
  standalone: true,
  imports: [CardComponent, CommonModule,NavegationComponent,HttpClientModule, FormsModule],
  templateUrl: './homeproduct.component.html',
  styleUrls: ['./homeproduct.component.css'],
})

export class HomeproductComponent implements OnInit {
  products: Product[] = [];
  prev: string| null = null;
  next: string| null = null;
  currentPage: number = 1;
  searchName: string = '';
  type: string ='';
  sortOrder: string= 'asc';
  constructor(private apiService: HomeproductService, private cartService: CartService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.apiService
      .getAvailableProducts(this.searchName, this.type, this.sortOrder, this.currentPage, 10)
      .subscribe({
        next: (data) => {
          console.log('Datos recibidos:', data);
          this.products = data.Products;
          this.prev = data.PageNumber > 1 ? (data.PageNumber - 1).toString() : null;
          this.next =
            (data.PageNumber * data.PageSize) < data.TotalItems ? (data.PageNumber + 1).toString() : null;
        },
        error: (err) => {
          console.error('Error al cargar productos:', err);
        },
      });
  }



  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchName = input.value.trim();
    this.currentPage = 1; // Reinicia a la primera página
    this.loadProducts();
  }

  onPageChange(direction: boolean): void {
    if (direction) {
      this.currentPage++;
    } else {
      this.currentPage--;
    }
    this.loadProducts();
  }

  onFilterType(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.type = select.value; // Cambia el filtro de tipo
    this.currentPage = 1;
    this.loadProducts();
  }

  onSortOrder(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.sortOrder = select.value; // Cambia el orden
    this.currentPage = 1;
    this.loadProducts();
  }
  addToCart(productId: number): void {
    this.cartService.addToCart(productId); // Utiliza un servicio para manejar el carrito
    alert('Producto añadido al carrito');
  }

}
