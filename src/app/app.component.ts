import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { FormsModule } from '@angular/forms';
import { ProductManagementComponent } from "./product-management/product-management.component";
import { SalesViewComponent } from './sales-view/sales-view.component';
import { CartComponent } from './cart/cart.component';
/**
 * Componente raíz de la aplicación.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CommonModule,ProductManagementComponent, SalesViewComponent, EditProfileComponent, ChangePasswordComponent, RouterOutlet, FormsModule, CartComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  /**
   * Título dinámico que se muestra en la barra superior.
   */
  title = 'TallerIDWMFrontendWeb';

  /**
   * Indica si el usuario actual es administrador.
   */
  isAdmin = false;

  /**
   * Indica si el usuario está autenticado.
   */
  isAuthenticated = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  /**
   * Inicializa el componente.
   * Configura la autenticación y establece el título basado en la ruta actual.
   */
  ngOnInit(): void {
    initFlowbite();
    this.checkAuthentication(); // Verifica la autenticación al cargar el componente.
    this.setTitleBasedOnRoute(); // Ajusta el título dinámico según la ruta.
    window.addEventListener('storage', () => this.checkAuthentication()); // Escucha cambios en el almacenamiento local.
  }

  /**
   * Verifica si el usuario está autenticado y si es administrador.
   */
  checkAuthentication(): void {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email') || '';

    this.isAuthenticated = !!token; // Autenticación basada en la existencia del token.
    this.isAdmin = email.endsWith('@idwm.cl'); // Verifica si el correo pertenece a un administrador.
    console.log('¿Es administrador?:', this.isAdmin);
  }

  /**
   * Navega a una ruta específica.
   * @param path - Ruta a la que se desea navegar.
   */
  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  /**
   * Cierra la sesión, elimina los datos del usuario y redirige al inicio de sesión.
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.router.navigate(['/login']);
  }

  /**
   * Ajusta el título dinámico de la aplicación según la ruta actual.
   */
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
