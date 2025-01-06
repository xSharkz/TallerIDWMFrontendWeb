/**
 * Interfaz que representa un cliente en el sistema.
 */
export interface Clients {
  Id: number;        // Identificador único del cliente
  Rut: string;       // RUT del cliente (único y utilizado como identificador)
  Name: string;      // Nombre completo del cliente
  Email: string;     // Dirección de correo electrónico del cliente
  Gender: string;    // Género del cliente
  IsEnabled: boolean; // Estado de habilitación del cliente (true: habilitado, false: deshabilitado)
}

/**
 * Interfaz que representa la respuesta de la API al consultar la lista de clientes.
 */
export interface ClientResponse {
  Items: Clients[];   // Lista de clientes obtenidos
  TotalPages: number; // Número total de páginas disponibles para la paginación
}
