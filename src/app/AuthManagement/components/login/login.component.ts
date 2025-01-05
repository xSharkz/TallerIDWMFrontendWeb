import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  Email = '';
  Password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {

    if (!this.Email || !this.Email.includes('@')) {
      alert('Por favor, ingrese un email válido.');
      return;
    }

    if (!this.Password || this.Password.length < 8 || this.Password.length > 20) {
      alert('La contraseña debe tener entre 8 y 20 caracteres.');
      return;
    }


    const formData = new FormData();
    formData.append('Email', this.Email);
    formData.append('Password', this.Password);

    this.authService.login(formData).subscribe({
      next: (response) => {
        console.log('Inicio de sesión exitoso:', response);
        localStorage.setItem('token', response.Token);
        this.router.navigate(['/clients']);
      },
      error: (err) => {
        console.error('Error al iniciar sesión:', err);
        const errorMessage = err.error ||'Ocurrio un error inesperado. Intente nuevamente';
        alert(errorMessage);
      }
    });
  }
}
