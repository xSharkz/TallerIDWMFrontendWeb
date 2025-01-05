export interface Clients{
  Id:number;
  Rut: string;
  Name: string;
  Email: string;
  Gender: string;
  IsEnabled: boolean;
}

export interface ClientResponse{
  Items: Clients[];
  TotalPages: number;
}
