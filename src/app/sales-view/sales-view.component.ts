import { Component, OnInit } from '@angular/core';
import { SalesService } from '../services/sales.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Sale {
  fecha: string;
  cliente: string;
  producto: string;
  cantidad: number;
  total: number;
}
@Component({
  selector: 'app-sales-view',
  templateUrl: './sales-view.component.html',
  styleUrls: ['./sales-view.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [SalesService],
})
export class SalesViewComponent implements OnInit {
  sales: Sale[] = [];
  page = 1;
  limit = 10;
  totalItems = 0;
  searchTerm = '';
  sortBy = 'fecha';
  sortOrder = 'desc';

  constructor(private SalesService: SalesService) { }
  ngOnInit(): void {
    this.loadSales();
  }

  loadSales(): void {
    this.SalesService.getVentas(this.page, this.limit, this.searchTerm, this.sortBy, this.sortOrder)
      .subscribe(data => {
        this.sales = data.sales;
        this.totalItems = data.totalItems;
      });
  }

  onSearch(): void {
    this.page = 1;
    this.loadSales();
  }

  onSort(sortBy: string): void {
    this.sortBy = sortBy;
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.loadSales();
  }

  onPageChange(page: number): void {
    this.page = page;
    this.loadSales();
  }
}
