import { Component, OnInit } from '@angular/core';
import { Clients } from '../../interfaces/Clients'; // Interfaz que representa los datos del cliente
import { ClientmanagementService } from '../../services/clientmanagement.service'; // Servicio para gestionar clientes
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/**
 * Componente para la gestión de clientes.
 * Permite buscar, listar, paginar y habilitar/deshabilitar clientes.
 */
@Component({
  selector: 'app-clientmanagement',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './clientmanagement.component.html',
  styleUrls: ['./clientmanagement.component.css']
})
export class ClientmanagementComponent implements OnInit {
  clients: Clients[] = []; // Arreglo para almacenar la lista de clientes
  currentPage: number = 1; // Página actual en la paginación
  totalPages: number = 1; // Total de páginas disponibles
  searchQuery: string = ''; // Texto de búsqueda para filtrar clientes

  /**
   * Constructor del componente.
   * @param clientService Servicio para gestionar clientes.
   */
  constructor(private clientService: ClientmanagementService) {}

  /**
   * Método de inicialización del componente.
   * Se ejecuta al cargarse el componente y llama a la función `loadClients` para obtener los datos iniciales.
   */
  ngOnInit(): void {
    this.loadClients();
  }

  /**
   * Carga la lista de clientes desde el servicio.
   * Filtra los resultados basándose en el texto de búsqueda y la página actual.
   */
  loadClients(): void {
    this.clientService.getClients(this.searchQuery, this.currentPage).subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
        this.clients = data.Items; // Almacena los clientes recibidos
        this.totalPages = data.TotalPages; // Actualiza el total de páginas disponibles
      },
      error: (err) => {
        console.error('Error al cargar clientes:', err);
      },
    });
  }

  /**
   * Maneja el evento de búsqueda.
   * Reinicia la página actual y vuelve a cargar los clientes basándose en el texto de búsqueda.
   * @param event Evento de entrada (input).
   */
  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value.trim(); // Actualiza el texto de búsqueda
    this.currentPage = 1; // Reinicia a la primera página
    this.loadClients(); // Recarga la lista de clientes
  }

  /**
   * Cambia la página actual en función de la dirección de navegación.
   * Luego recarga los datos correspondientes.
   * @param direction Dirección de la navegación: `true` para avanzar, `false` para retroceder.
   */
  onPageChange(direction: boolean): void {
    if (direction && this.currentPage < this.totalPages) {
      this.currentPage++; // Avanza a la siguiente página
    } else if (!direction && this.currentPage > 1) {
      this.currentPage--; // Retrocede a la página anterior
    }
    this.loadClients(); // Recarga la lista de clientes
  }

  /**
   * Cambia el estado de habilitación de un cliente.
   * @param UserId ID del cliente a actualizar.
   * @param IsEnabled Nuevo estado de habilitación del cliente (`true` para habilitar, `false` para deshabilitar).
   */
  toggleClienteStatus(UserId: number, IsEnabled: boolean): void {
    this.clientService.toggleClientStatus(UserId, IsEnabled).subscribe({
      next: (response) => {
        alert(response.message || `Cliente ${IsEnabled ? 'habilitado' : 'deshabilitado'} con éxito.`);
        this.loadClients(); // Recarga la lista de clientes después de actualizar el estado
      },
      error: (err) => {
        console.error('Error al actualizar cliente:', err);
        alert(err.error?.message || 'Error al actualizar el cliente. Verifica los datos e intenta de nuevo.');
      },
    });
  }
}
