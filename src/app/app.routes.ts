import { Routes } from '@angular/router';
import { ClientmanagementComponent } from './UserManagement/components/clientmanagement/clientmanagement.component';
export const routes: Routes = [
  {path: '', redirectTo: '/clients', pathMatch:'full'},
  {path: 'clients', component: ClientmanagementComponent}
];
