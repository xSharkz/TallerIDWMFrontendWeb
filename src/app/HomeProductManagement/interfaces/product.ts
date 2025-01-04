export interface Product {
  id: number;
  name: string;
  type: string;
  price: number;
  stockQuantity: number;
  imageUrl: string;
}


export interface ApiResponse {
  TotalItems: number;
  PageNumber: number;
  PageSize: number;
  Products: Product[];
}
