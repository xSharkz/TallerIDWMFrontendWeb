export interface Product {
  Id: number;
  Name: string;
  Type: string;
  Price: number;
  StockQuantity: number;
  ImageUrl: string;
}


export interface ApiResponse {
  TotalItems: number;
  PageNumber: number;
  PageSize: number;
  Products: Product[];
}
