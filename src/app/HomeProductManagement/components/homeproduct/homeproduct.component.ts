import { Component, OnInit } from '@angular/core';
import { HomeproductService } from '../../services/homeproduct.service';
import { Product } from '../../interfaces/product';
import { CardComponent } from '../card/card.component.spec';
import { CommonModule } from '@angular/common';
import { NavegationComponent } from '../navegation/navegation.component';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-homeproduct',
  standalone: true,
  imports: [CardComponent, CommonModule,NavegationComponent,HttpClientModule],
  templateUrl: './homeproduct.component.html',
  styleUrls: ['./homeproduct.component.css'],
})

export class HomeproductComponent implements OnInit {
  products: Product[] = [];
  prev: string| null = null;
  next: string| null = null;
  currentPage: number = 1;
  searchName: string = '';

  constructor(private apiService: HomeproductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.apiService.getProducts(this.searchName, 'all', 'asc', this.currentPage).subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
        this.products = data.products; // Asumiendo que la respuesta usa el campo 'products'
        this.prev = data.pageNumber > 1 ? `?page=${data.pageNumber - 1}` : null; // Controlar paginación
        this.next = (data.pageNumber * data.pageSize) < data.totalItems ? `?page=${data.pageNumber + 1}` : null;
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
      }
    });
  }

  onSearch(event: Event){
    const input = event.target as HTMLInputElement;
    this.searchName = input.value.trim();
    this.currentPage = 1;
    this.loadProducts();
  }
  onPageChange(direction: boolean){
    if(direction){
      this.currentPage++;
    }else{
      this.currentPage--;
    }

  }
}
