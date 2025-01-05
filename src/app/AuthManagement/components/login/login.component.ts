import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule, CommonModule, RouterModule],
  styleUrls: ['./login.component.css'],
  standalone: true,
})
export class LoginComponent {
  Email = '';
  Password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    // Validaciones del email y contraseña
    if (!this.Email || !this.Email.includes('@')) {
      alert('Por favor, ingrese un email válido.');
      return;
    }

    if (!this.Password || this.Password.length < 8 || this.Password.length > 20) {
      alert('La contraseña debe tener entre 8 y 20 caracteres.');
      return;
    }

    // Formatear datos para el backend
    const formData = new FormData();
    formData.append('Email', this.Email);
    formData.append('Password', this.Password);

    this.authService.login(formData).subscribe({
      next: (response) => {
        console.log('Inicio de sesión exitoso:', response);

        // Almacena el token
        localStorage.setItem('token', response.Token);

        // Verifica el correo para redirigir según el dominio
        if (this.Email.endsWith('@idwm.cl')) {
          this.router.navigate(['/clients']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        console.error('Error al iniciar sesión:', err);
        const errorMessage =
          err.error || 'Ocurrio un error inesperado. Intente nuevamente';
        alert(errorMessage);
      },
    });
  }
}
