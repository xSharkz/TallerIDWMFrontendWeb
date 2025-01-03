import { Component, OnInit } from '@angular/core';
import { HomeproductService } from '../../services/homeproduct.service';
@Component({
  selector: 'app-homeproduct',
  imports: [],
  templateUrl: './homeproduct.component.html',
  styleUrl: './homeproduct.component.css'
})
export class HomeproductComponent implements OnInit {
  products: any[]=[];
  filter= '';
  type = '';
  order= '';
  page = 1;

  constructor(private homeproductService: HomeproductService ){}
  ngOnInit(): void {
      this.fetchProducts();
  }
  fetchProducts():void{
    this.homeproductService.getProducts(this.filter, this.type, this.order, this.page).subscribe({
      next:(data) =>(this.products = data.items),
      error:(err) => console.error(err),
    });
  }
  changePage(next: boolean): void{
    this.page = next ? 1: -1;
    this.fetchProducts();
  }
}
