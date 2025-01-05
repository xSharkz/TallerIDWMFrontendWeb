import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isAdmin = false; // Determina si el usuario es administrador
  isAuthenticated = false; // Determina si el usuario está autenticado

  constructor(private router: Router) {}

  title = 'TallerIDWMFrontendWeb';

  ngOnInit(): void {
    initFlowbite();
    this.checkAuthentication(); // Verifica el estado de autenticación al cargar
    window.addEventListener('storage', ()=> this.checkAuthentication());
  }

  // Verifica si el usuario está autenticado y si es administrador
  checkAuthentication(): void {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email') || '';

    this.isAuthenticated = !!token; // Verifica si hay un token
    this.isAdmin = email.endsWith('@idwm.cl'); // Verifica si el correo pertenece a un administrador
    console.log(this.isAdmin);
  }

  // Navega a una ruta específica
  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  // Cierra sesión y limpia la información almacenada
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.router.navigate(['/login']);
  }
}
