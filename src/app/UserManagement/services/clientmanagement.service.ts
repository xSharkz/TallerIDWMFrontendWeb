import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientResponse } from '../interfaces/Clients';

@Injectable({
  providedIn: 'root'
})
export class ClientmanagementService {
  private apiUrl='http://localhost:5220/api/User/customers';
  constructor(private http: HttpClient) { }


  getClients(searchQuery:string, page:number):Observable<ClientResponse>{
    const params = new HttpParams().set('searchQuery',searchQuery).set('page',page.toString());
    return this.http.get<ClientResponse>(`${this.apiUrl}`, { params });
  }

  toggleClientStatus(clientId:number, status:boolean):Observable<void>{
    return this.http.patch<void>(`${this.apiUrl}/${clientId}/status`,{ activo: status });
  }

}
