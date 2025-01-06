import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Servicio para manejar autenticación.
import { Router, RouterModule } from '@angular/router'; // Para manejar navegación entre rutas.
import { FormsModule } from '@angular/forms'; // Para manejar formularios.
import { CommonModule } from '@angular/common'; // Para directivas comunes.

@Component({
  selector: 'app-login', // Selector del componente.
  templateUrl: './login.component.html', // Ruta del archivo HTML del componente.
  imports: [FormsModule, CommonModule, RouterModule], // Módulos importados.
  styleUrls: ['./login.component.css'], // Archivo de estilos del componente.
  standalone: true, // Componente independiente.
})
export class LoginComponent {
  /**
   * Email ingresado por el usuario.
   * @type {string}
   */
  Email = '';

  /**
   * Contraseña ingresada por el usuario.
   * @type {string}
   */
  Password = '';

  /**
   * Constructor que inyecta el servicio de autenticación y el router.
   * @param authService Servicio de autenticación para manejar el login.
   * @param router Router para la navegación entre páginas.
   */
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Método para manejar el inicio de sesión.
   * Valida el email y la contraseña, llama al servicio de autenticación,
   * y redirige al usuario según su rol (cliente o administrador).
   */
  login(): void {
    // Validar que el email tenga un formato correcto.
    if (!this.Email || !this.Email.includes('@')) {
      alert('Por favor, ingrese un email válido.');
      return;
    }

    // Validar que la contraseña tenga entre 8 y 20 caracteres.
    if (!this.Password || this.Password.length < 8 || this.Password.length > 20) {
      alert('La contraseña debe tener entre 8 y 20 caracteres.');
      return;
    }

    // Crear un objeto FormData para enviar los datos al backend.
    const formData = new FormData();
    formData.append('Email', this.Email);
    formData.append('Password', this.Password);

    // Llamar al servicio de autenticación.
    this.authService.login(formData).subscribe({
      /**
       * Manejo del caso exitoso.
       * @param response Respuesta del backend con el token de autenticación.
       */
      next: (response) => {
        console.log('Inicio de sesión exitoso:', response);

        // Almacenar el token en localStorage.
        localStorage.setItem('token', response.Token);

        // Almacenar el email en localStorage.
        localStorage.setItem('email', this.Email);

        // Verificar si el usuario es administrador según su email.
        const isAdmin = this.Email.endsWith('@idwm.cl');

        // Redirigir según el rol del usuario.
        if (isAdmin) {
          this.router.navigate(['/home']); // Página de inicio para administradores.
        } else {
          this.router.navigate(['/home']); // Página de inicio para clientes.
        }
      },
      /**
       * Manejo del caso de error.
       * @param err Objeto de error recibido desde el backend.
       */
      error: (err) => {
        console.error('Error al iniciar sesión:', err);

        // Mostrar un mensaje de error al usuario.
        const errorMessage =
          err.error || 'Ocurrio un error inesperado. Intente nuevamente';
        alert(errorMessage);
      },
    });
  }
}
