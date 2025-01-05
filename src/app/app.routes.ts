import { Routes } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

export const routes: Routes = [
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'change-password', component: ChangePasswordComponent },
];

