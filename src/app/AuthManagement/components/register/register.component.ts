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
    if (this.userData.Password !== this.userData.ConfirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    if (!this.isValidRUT(this.userData.Rut)) {
      alert('RUT no válido');
      return;
    }

    // Crear un objeto FormData
    const formData = new FormData();
    formData.append('Rut', this.userData.Rut);
    formData.append('Name', this.userData.Name);
    formData.append('BirthDate', this.userData.BirthDate);
    formData.append('Email', this.userData.Email);
    formData.append('Gender', this.userData.Gender);
    formData.append('Password', this.userData.Password);

    // Llamar al servicio de registro
    this.authService.register(formData).subscribe({
      next: () => alert('Registro exitoso'),
      error: (err) => {
        console.error('Error al registrarse:', err);
        alert('Error al registrarse: ' + (err.error?.Message || 'Por favor, verifica los datos.'));
      },
    });
  }

  isValidRUT(rut: string): boolean{
    const rutPattern = /^[0-9]{1,8}-[0-9kK]{1}$/;
    return rutPattern.test(rut);
  }
}
