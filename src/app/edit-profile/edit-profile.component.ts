import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  imports: [FormsModule],
})
export class EditProfileComponent implements OnInit {
  userProfile = {
    name: '',
    birthDate: '',
    gender: '',
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userService.getUserProfile().subscribe((data) => {
      this.userProfile = data;
    });
  }

  saveProfile(): void {
    this.userService.updateUserProfile(this.userProfile).subscribe(() => {
      alert('Perfil actualizado exitosamente');
    });
  }
}
