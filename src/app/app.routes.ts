import { Routes } from '@angular/router';
import { LoginComponent } from './AuthManagement/components/login/login.component';
import { RegisterComponent } from './AuthManagement/components/register/register.component';
import { ClientmanagementComponent } from './UserManagement/components/clientmanagement/clientmanagement.component';
import { authGuard } from './AuthManagement/guards/auth.guard';
import { HomeproductComponent } from './HomeProductManagement/components/homeproduct/homeproduct.component';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirección inicial
  { path: 'login', component: LoginComponent }, // Página de inicio de sesión
  { path: 'register', component: RegisterComponent }, // Página de registro
  {
    path: 'clients',
    component: ClientmanagementComponent,
    canActivate: [authGuard], // Ruta protegida por el guard
  },
];
