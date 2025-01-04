import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  imports:[CommonModule],
  standalone: true,
})
export class CardComponent {
  @Input() product!: Product;
}
