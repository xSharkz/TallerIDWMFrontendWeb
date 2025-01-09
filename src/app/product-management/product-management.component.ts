import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../services/product.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  providers: [ProductService],
})
export class ProductManagementComponent implements OnInit {
  products: Product[] = [];
  paginatedProducts: Product[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.updatePagination();
    });
  }

  filterProducts(): void {
    const filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.updatePagination(filteredProducts);
  }

  updatePagination(filteredProducts?: Product[]): void {
    const products = filteredProducts || this.products;
    this.totalPages = Math.ceil(products.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedProducts = products.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  openAddProductForm(): void {
    const newProduct: Product = {
      id: 0,
      name: 'Nuevo Producto',
      type: 'Tipo',
      price: 0,
      stock: 0,
    };
    this.productService.createProduct(newProduct).subscribe(() => {
      this.loadProducts();
      alert('Producto agregado');
    });
  }

  openEditProductForm(product: Product): void {
    const updatedProduct = { ...product, name: product.name + ' (Actualizado)' };
    this.productService.updateProduct(updatedProduct).subscribe(() => {
      this.loadProducts();
      alert('Producto actualizado');
    });
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.loadProducts();
      alert('Producto eliminado');
    });
  }
}
