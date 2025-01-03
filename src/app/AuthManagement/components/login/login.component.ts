import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['/src/app/AuthManagement/components/login/login.component.css']
})
export class LoginComponent {
  email ='';
  password = '';

  constructor(private authService: AuthService){}

  login():void{
    this.authService.login({email: this.email, password: this.password}).subscribe({
      next:(response) =>{
        localStorage.setItem('token',response.token);
        alert('Inicio de sesion exitoso');
      },
      error:(err) => alert('Error al iniciar sesion'),
    });
  }
}
