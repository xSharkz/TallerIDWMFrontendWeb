import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
})


export class RegisterComponent {
  userData ={
    Rut: '',
    Name: '',
    BirthDate: '',
    Email: '',
    Gender: '',
    Password: '',
    ConfirmPassword: '',
  };

  genders = ['Femenino','Masculino', 'Prefiero no decirlo','Otro'];

  constructor(private authService: AuthService){}

  register(): void {
    if (!this.userData.ConfirmPassword) {
      alert('El campo ConfirmPassword es obligatorio.');
      return;
    }
    if (this.userData.Password !== this.userData.ConfirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    if (!this.isValidRUT(this.userData.Rut)) {
      alert('El RUT ingresado no es válido. Por favor, asegúrate de ingresar un RUT real y correctamente formateado (Ej: 12345678-9).');
      return;
    }


    const formData = new FormData();
    formData.append('Rut', this.userData.Rut);
    formData.append('Name', this.userData.Name);
    formData.append('BirthDate', this.userData.BirthDate);
    formData.append('Email', this.userData.Email);
    formData.append('Gender', this.userData.Gender);
    formData.append('Password', this.userData.Password);
    formData.append('ConfirmPassword', this.userData.ConfirmPassword);

    this.authService.register(formData).subscribe({
      next: () => alert('Registro exitoso'),
      error: (err) => {
        console.error('Errores de validación del backend:', err.error?.errors);
        alert(
          'Error al registrarse: ' +
            (err.error?.title || 'Verifica los datos ingresados.')
        );
      },
    });
  }


  isValidRUT(rut: string): boolean {
    console.log(`Validando RUT: ${rut}`);

    // Eliminar puntos y espacios adicionales
    rut = rut.replace(/\./g, '').replace(/\s+/g, '');
    console.log(`RUT normalizado: ${rut}`);

    // Validar formato general (cuerpo numérico y dígito verificador separados por un guion)
    const rutRegex = /^\d+-[0-9Kk]$/;
    const isValidFormat = rutRegex.test(rut);

    console.log(`El formato del RUT es válido: ${isValidFormat}`);
    return isValidFormat;
  }


}
