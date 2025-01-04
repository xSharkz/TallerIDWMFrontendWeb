import { Component, OnInit } from '@angular/core';
import { HomeproductService } from '../../services/homeproduct.service';
import { Product } from '../../interfaces/product';
import { CardComponent } from '../card/card.component';
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
  type: string ='';
  constructor(private apiService: HomeproductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.apiService
      .getAvailableProducts(
        this.searchName || undefined, // Evitar parámetros vacíos
        this.type || undefined,
        'asc',
        this.currentPage,
        10
      )
      .subscribe({
        next: (data) => {
          console.log('Datos recibidos:', data);
          console.log('Productos: ', data.Products);
          this.products = data.Products; // Ajusta según la respuesta del backend
          this.prev = data.PageNumber > 1 ? (data.PageNumber - 1).toString() : null;
          this.next =
            (data.PageNumber * data.PageSize) < data.TotalItems ? (data.PageNumber + 1).toString() : null;
        },
        error: (err) => {
          console.error('Error al cargar productos:', err);
        },
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
