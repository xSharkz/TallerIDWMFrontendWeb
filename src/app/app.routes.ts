import { Routes } from '@angular/router';
import { LoginComponent } from './AuthManagement/components/login/login.component';
import { RegisterComponent } from './AuthManagement/components/register/register.component';
import { ClientmanagementComponent } from './UserManagement/components/clientmanagement/clientmanagement.component';
import { authGuard } from './AuthManagement/guards/auth.guard';
import { HomeproductComponent } from './HomeProductManagement/components/homeproduct/homeproduct.component';
import { PurchaseComponent } from './BuyProcess/components/purchase/purchase.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirección inicial
  { path: 'home',component: HomeproductComponent }, // Página de inicio de sesión
  { path: 'login',component: LoginComponent }, // Página de registro
  {path: 'clients',component: ClientmanagementComponent,canActivate: [authGuard],},
  {path: 'register',component: RegisterComponent},
  {path: 'buy',component: PurchaseComponent},
];
