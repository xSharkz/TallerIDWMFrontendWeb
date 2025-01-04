export interface Product {
  id: number;
  name: string;
  type: string;
  price: number;
  stockQuantity: number;
  imageUrl: string;
}


export interface ApiResponse {
  totalItems: number;
  pageNumber: number;
  pageSize: number;
  products: Product[];
}
