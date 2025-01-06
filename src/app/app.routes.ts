import { Routes } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { SalesViewComponent } from './sales-view/sales-view.component';

export const routes: Routes = [
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'product-management', component: ProductManagementComponent },
  { path: 'sales-view', component: SalesViewComponent },
];

