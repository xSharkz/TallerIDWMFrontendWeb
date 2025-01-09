import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';

/**
 * Componente `CardComponent` que representa una tarjeta individual
 * para mostrar información de un producto.
 */
@Component({
  selector: 'app-card', // Selector que identifica el componente en el HTML
  templateUrl: './card.component.html', // Ruta al archivo de plantilla HTML asociado
  styleUrls: ['./card.component.css'], // Ruta al archivo de estilos CSS asociado
  imports: [CommonModule], // Importa módulos comunes necesarios para el componente
  standalone: true, // Indica que el componente es autónomo y puede usarse sin un módulo
})
export class CardComponent {
  /**
   * Producto que será mostrado en la tarjeta.
   * Este dato se recibe como entrada desde el componente padre.
   */
  @Input() product!: Product;
}
