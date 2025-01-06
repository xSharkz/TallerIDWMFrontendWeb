import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Componente NavegationComponent
 * Este componente se encarga de manejar la navegación entre páginas, mostrando botones para "Anterior" y "Siguiente".
 */
@Component({
  selector: 'app-navegation', // Selector para usar este componente en otros templates
  templateUrl: './navegation.component.html', // Ruta al archivo de plantilla HTML
  styleUrls: ['./navegation.component.css'], // Ruta al archivo de estilos CSS
  standalone: true, // Indica que este componente es independiente y puede ser usado sin declararlo en un módulo
})
export class NavegationComponent {
  /**
   * Propiedad de entrada que indica si hay una página anterior disponible.
   * Si es `null`, el botón de "Anterior" estará deshabilitado.
   */
  @Input() prev!: string | null;

  /**
   * Propiedad de entrada que indica si hay una página siguiente disponible.
   * Si es `null`, el botón de "Siguiente" estará deshabilitado.
   */
  @Input() next!: string | null;

  /**
   * Evento de salida que emite un valor booleano para indicar la dirección de la navegación.
   * - `true`: Se solicita avanzar a la siguiente página.
   * - `false`: Se solicita retroceder a la página anterior.
   */
  @Output() onNavigate = new EventEmitter<boolean>();

  /**
   * Método que maneja la navegación.
   * Emite el evento `onNavigate` con el valor de `direction` para informar si se debe avanzar o retroceder.
   *
   * @param direction - Un valor booleano que indica la dirección:
   * - `true`: Avanzar a la página siguiente.
   * - `false`: Retroceder a la página anterior.
   */
  navigate(direction: boolean): void {
    this.onNavigate.emit(direction);
  }
}
