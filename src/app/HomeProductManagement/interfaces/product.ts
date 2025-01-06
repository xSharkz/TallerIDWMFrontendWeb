/**
 * Representa un producto con sus detalles.
 */
export interface Product {
  /**
   * Identificador único del producto.
   */
  Id: number;

  /**
   * Nombre del producto.
   */
  Name: string;

  /**
   * Tipo o categoría del producto.
   */
  Type: string;

  /**
   * Precio del producto.
   */
  Price: number;

  /**
   * Cantidad disponible en el inventario.
   */
  StockQuantity: number;

  /**
   * URL de la imagen asociada al producto.
   */
  ImageUrl: string;
}

/**
 * Representa la estructura de la respuesta de la API para productos.
 */
export interface ApiResponse {
  /**
   * Número total de productos disponibles en el sistema.
   */
  TotalItems: number;

  /**
   * Número de la página actual de los resultados.
   */
  PageNumber: number;

  /**
   * Número de productos mostrados por página.
   */
  PageSize: number;

  /**
   * Lista de productos obtenidos en la página actual.
   */
  Products: Product[];
}
