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
  selector: 'app-homeproduct', // Selector del componente
  standalone: true, // Define que este componente es independiente
  imports: [CardComponent, CommonModule, NavegationComponent, HttpClientModule, FormsModule], // Módulos y componentes importados
  templateUrl: './homeproduct.component.html', // Ruta al archivo HTML
  styleUrls: ['./homeproduct.component.css'], // Ruta al archivo CSS
})
export class HomeproductComponent implements OnInit {
  /**
   * Lista de productos disponibles.
   */
  products: Product[] = [];

  /**
   * Enlace a la página anterior. `null` si no hay página previa.
   */
  prev: string | null = null;

  /**
   * Enlace a la página siguiente. `null` si no hay más páginas.
   */
  next: string | null = null;

  /**
   * Página actual de productos.
   */
  currentPage: number = 1;

  /**
   * Nombre del producto a buscar.
   */
  searchName: string = '';

  /**
   * Tipo de producto para filtrar.
   */
  type: string = '';

  /**
   * Orden de los productos (ascendente o descendente).
   */
  sortOrder: string = 'asc';

  /**
   * Constructor del componente.
   * @param apiService Servicio para interactuar con la API de productos.
   * @param cartService Servicio para manejar el carrito de compras.
   */
  constructor(private apiService: HomeproductService, private cartService: CartService) {}

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.loadProducts();
  }

  /**
   * Carga los productos disponibles desde la API.
   */
  loadProducts(): void {
    this.apiService
      .getAvailableProducts(this.searchName, this.type, this.sortOrder, this.currentPage, 10)
      .subscribe({
        next: (data) => {
          console.log('Datos recibidos:', data);
          this.products = data.Products;
          this.prev = data.PageNumber > 1 ? (data.PageNumber - 1).toString() : null;
          this.next = (data.PageNumber * data.PageSize) < data.TotalItems ? (data.PageNumber + 1).toString() : null;
        },
        error: (err) => {
          console.error('Error al cargar productos:', err);
        },
      });
  }

  /**
   * Maneja el evento de búsqueda por nombre.
   * @param event Evento de entrada del usuario.
   */
  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchName = input.value.trim();
    this.currentPage = 1; // Reinicia a la primera página
    this.loadProducts();
  }

  /**
   * Cambia de página en la lista de productos.
   * @param direction `true` para avanzar, `false` para retroceder.
   */
  onPageChange(direction: boolean): void {
    if (direction) {
      this.currentPage++;
    } else {
      this.currentPage--;
    }
    this.loadProducts();
  }

  /**
   * Filtra los productos por tipo.
   * @param event Evento de selección del tipo.
   */
  onFilterType(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.type = select.value; // Cambia el filtro de tipo
    this.currentPage = 1; // Reinicia a la primera página
    this.loadProducts();
  }

  /**
   * Cambia el orden de los productos.
   * @param event Evento de selección del orden.
   */
  onSortOrder(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.sortOrder = select.value; // Cambia el orden
    this.currentPage = 1; // Reinicia a la primera página
    this.loadProducts();
  }

  /**
   * Añade un producto al carrito de compras.
   * @param productId ID del producto a añadir.
   */
  addToCart(productId: number): void {
    this.cartService.addToCart(productId); // Utiliza un servicio para manejar el carrito
    alert('Producto añadido al carrito');
  }
}
