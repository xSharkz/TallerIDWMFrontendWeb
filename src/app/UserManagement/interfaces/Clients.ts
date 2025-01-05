export interface Clients{
  id:number;
  nombre: string;
  email: string;
  activo: boolean;
}

export interface ClientResponse{
  clientes: Clients[];
  totalPages: number;
}
