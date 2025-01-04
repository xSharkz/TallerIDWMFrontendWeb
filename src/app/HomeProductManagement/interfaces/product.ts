
export interface Product {
  id: number;
  name: string;
  type: string;
  price: number;
  stockQuantity: number;
  imageUrl: string;
}

export interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: Product[];
}
