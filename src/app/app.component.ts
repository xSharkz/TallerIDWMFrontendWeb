import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { ActivatedRoute,Router,NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  tittle = 'Gestion de productos'
  isAdmin = false; // Determina si el usuario es administrador
  isAuthenticated = false; // Determina si el usuario está autenticado

  constructor(private router: Router, private route: ActivatedRoute) {}

  title = 'TallerIDWMFrontendWeb';

  ngOnInit(): void {
    initFlowbite();
    this.checkAuthentication(); // Verifica el estado de autenticación al cargar
    this.setTitleBasedOnRoute();
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

  setTitleBasedOnRoute(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentRoute = this.route.root.firstChild?.snapshot.routeConfig?.path;

        switch (currentRoute) {
          case 'home':
            this.title = 'Tienda de Productos';
            break;
          case 'clients':
            this.title = 'Gestión de Clientes';
            break;
          case 'buy':
            this.title = 'Gestión de Órdenes';
            break;
          default:
            this.title = '';
        }
      });
  }
}
