import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['/src/app/AuthManagement/components/register/register.component.css'],
  standalone: true,
})


export class RegisterComponent {
  userData ={
    rut: '',
    name: '',
    birthDate: '',
    email: '',
    gender: '',
    password: '',
    confirmPassword: '',
  };

  genders = ['Femenino','Masculino', 'Prefiero no decirlo','Otro'];

  constructor(private authService: AuthService){}

  register():void{
    if(this.userData.password !== this.userData.confirmPassword){
      alert('Las contraseñas no coinciden')
      return;
    }
    if(!this.isValidRUT(this.userData.rut)){
      alert('RUT no válido');
      return;
    }
    this.authService.register(this.userData).subscribe({
      next:() => alert('Registro exitoso'),
      error:(err) => alert('Error al registrarse: '+ err.message),
    });
  }
  isValidRUT(rut: string): boolean{
    const rutPattern = /^[0-9]{1,8}-[0-9kK]{1}$/;
    return rutPattern.test(rut);
  }
}
