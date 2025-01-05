import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  imports: [UserService],
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  passwordData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  constructor(private userService: UserService) {}

  changePassword(): void {
    if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    this.userService.changePassword(this.passwordData).subscribe(() => {
      alert('Contraseña actualizada exitosamente');
    });
  }
}
