import { Routes } from '@angular/router';
import { HomeproductComponent } from './HomeProductManagement/components/homeproduct/homeproduct.component';
export const routes: Routes = [
  { path: 'homeproduct', component: HomeproductComponent },
  { path: '', redirectTo: 'homeproduct', pathMatch:'full'}
];
