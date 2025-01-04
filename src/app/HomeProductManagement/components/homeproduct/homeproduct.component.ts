import { Component, OnInit } from '@angular/core';
import { HomeproductService } from '../../services/homeproduct.service';
import { Product, ApiResponse } from '../../interfaces/product';  // Verifica que las rutas de importación sean correctas

@Component({
  selector: 'app-homeproduct',
  templateUrl: './homeproduct.component.html',
  styleUrls: ['./homeproduct.component.css']
})
export class HomeproductComponent implements OnInit {
  products: Product[] = [];  // Array para almacenar los productos
  filter = '';  // Filtro para búsqueda o filtrado de productos
  type = '';  // Tipo de producto para filtrar
  order = '';  // Orden de los resultados
  page = 1;  // Página actual inicializada en 1

  constructor(private homeproductService: HomeproductService) {}

  ngOnInit(): void {
    this.fetchProducts();  // Llamada inicial para cargar productos
  }

  // Método para cargar productos desde la API
  fetchProducts(): void {
    this.homeproductService.getProducts(this.filter, this.type, this.order, this.page).subscribe({
      next: (data: ApiResponse) => {
        this.products = data.results;  // Asignar los resultados obtenidos al array de productos
      },
      error: (err) => {
        console.error('Error al cargar los productos:', err);
      }
    });
  }

  // Método para cambiar la página de productos
  changePage(next: boolean): void {
    this.page += next ? 1 : -1;  // Incrementar o decrementar el número de página
    if (this.page < 1) {  // Prevenir número de página menor que 1
      this.page = 1;
    }
    this.fetchProducts();  // Volver a cargar productos para la nueva página
  }
}
