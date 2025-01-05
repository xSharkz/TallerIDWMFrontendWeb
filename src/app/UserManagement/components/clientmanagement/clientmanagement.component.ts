import { Component, OnInit } from '@angular/core';
import { Clients } from '../../interfaces/Clients';
import { ClientmanagementService } from '../../services/clientmanagement.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-clientmanagement',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clientmanagement.component.html',
  styleUrls: ['./clientmanagement.component.css']
})
export class ClientmanagementComponent implements OnInit {
  clients: Clients[]= [];
  currentPage: number = 1;
  totalPages: number = 1;
  searchQuery: string = '';


  constructor(private clientService: ClientmanagementService){}


  ngOnInit(): void {
      this.loadClients();
  }

  loadClients():void{
    this.clientService.getClients(this.searchQuery, this.currentPage).subscribe({next:(data)=>
    {
      this.clients = data.clientes;
      this.totalPages = data.totalPages;
    },
    error:(err)=>console.error('Error al cargar clientes: ', err),
    });
  }

  onSearch(event:Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value.trim();
    this.currentPage = 1;
    this.loadClients();
  }

  onPageChange(direction:boolean): void{
    if(direction && this.currentPage < this.totalPages){
      this.currentPage++;
    }
    else if(!direction && this.currentPage > 1){
      this.currentPage--;
    }
  }
  toggleClienteStatus(clienteId: number, status: boolean): void {
    this.clientService.toggleClientStatus(clienteId, status).subscribe({
      next: () => {
        alert(
          `Cliente ${status ? 'habilitado' : 'deshabilitado'} con éxito.`
        );
        this.loadClients();
      },
      error: (err) => console.error('Error al actualizar cliente:', err),
    });
  }
}
