import { Routes } from '@angular/router';
import { LoginComponent } from './AuthManagement/components/login/login.component';
import { RegisterComponent } from './AuthManagement/components/register/register.component';
import { ClientmanagementComponent } from './UserManagement/components/clientmanagement/clientmanagement.component';
import { authGuard } from './AuthManagement/guards/auth.guard';
import { HomeproductComponent } from './HomeProductManagement/components/homeproduct/homeproduct.component';
import { PurchaseComponent } from './BuyProcess/components/purchase/purchase.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { SalesViewComponent } from './sales-view/sales-view.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirección inicial
  { path: 'home',component: HomeproductComponent }, // Página de inicio de sesión
  { path: 'login',component: LoginComponent }, // Página de registro
  {path: 'clients',component: ClientmanagementComponent,canActivate: [authGuard],},
  {path: 'register',component: RegisterComponent},
  {path: 'buy',component: PurchaseComponent},
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'product-management', component: ProductManagementComponent },
  { path: 'sales-view', component: SalesViewComponent },
];
