import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Servicio para manejar la autenticación.
import { FormsModule } from '@angular/forms'; // Módulo para manejar formularios.
import { CommonModule } from '@angular/common'; // Directivas y módulos comunes.
import { RouterModule } from '@angular/router'; // Para navegación.

@Component({
  selector: 'app-register', // Selector del componente.
  imports: [FormsModule, CommonModule, RouterModule], // Módulos importados.
  templateUrl: './register.component.html', // Ruta del archivo HTML del componente.
  styleUrls: ['./register.component.css'], // Archivo de estilos CSS del componente.
  standalone: true, // Componente independiente.
})
export class RegisterComponent {
  /**
   * Objeto que almacena los datos del usuario para el registro.
   * @type {object}
   */
  userData = {
    Rut: '',
    Name: '',
    BirthDate: '',
    Email: '',
    Gender: '',
    Password: '',
    ConfirmPassword: '',
  };

  /**
   * Lista de opciones de género disponibles.
   * @type {string[]}
   */
  genders = ['Femenino', 'Masculino', 'Prefiero no decirlo', 'Otro'];

  /**
   * Constructor que inyecta el servicio de autenticación.
   * @param authService Servicio para manejar las operaciones de autenticación.
   */
  constructor(private authService: AuthService) {}

  /**
   * Maneja el proceso de registro del usuario.
   * Valida los campos ingresados y envía los datos al backend.
   */
  register(): void {
    // Validar que el campo ConfirmPassword no esté vacío.
    if (!this.userData.ConfirmPassword) {
      alert('El campo ConfirmPassword es obligatorio.');
      return;
    }

    // Validar que las contraseñas coincidan.
    if (this.userData.Password !== this.userData.ConfirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    // Validar que el RUT sea válido.
    if (!this.isValidRUT(this.userData.Rut)) {
      alert(
        'El RUT ingresado no es válido. Por favor, asegúrate de ingresar un RUT real y correctamente formateado (Ej: 12345678-9).'
      );
      return;
    }

    // Crear un objeto FormData para enviar los datos al backend.
    const formData = new FormData();
    formData.append('Rut', this.userData.Rut);
    formData.append('Name', this.userData.Name);
    formData.append('BirthDate', this.userData.BirthDate);
    formData.append('Email', this.userData.Email);
    formData.append('Gender', this.userData.Gender);
    formData.append('Password', this.userData.Password);
    formData.append('ConfirmPassword', this.userData.ConfirmPassword);

    // Llamar al servicio de autenticación para registrar al usuario.
    this.authService.register(formData).subscribe({
      /**
       * Caso exitoso del registro.
       */
      next: () => alert('Registro exitoso'),

      /**
       * Manejo de errores en el registro.
       * @param err Respuesta de error del backend.
       */
      error: (err) => {
        console.error('Errores de validación del backend:', err.error?.errors);
        alert(
          'Error al registrarse: ' +
            (err.error?.title || 'Verifica los datos ingresados.')
        );
      },
    });
  }

  /**
   * Valida si un RUT chileno es válido.
   * @param rut RUT ingresado por el usuario.
   * @returns {boolean} `true` si el RUT es válido, `false` en caso contrario.
   */
  isValidRUT(rut: string): boolean {
    console.log(`Validando RUT: ${rut}`);

    // Eliminar puntos y espacios adicionales.
    rut = rut.replace(/\./g, '').replace(/\s+/g, '');
    console.log(`RUT normalizado: ${rut}`);

    // Validar formato general (cuerpo numérico y dígito verificador separados por un guion).
    const rutRegex = /^\d+-[0-9Kk]$/;
    const isValidFormat = rutRegex.test(rut);

    console.log(`El formato del RUT es válido: ${isValidFormat}`);
    return isValidFormat;
  }
}
