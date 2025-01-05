import { Routes } from '@angular/router';
import { PurchaseComponent } from './BuyProcess/components/purchase/purchase.component';

export const routes: Routes = [
  {
    path: 'purchase',
    component: PurchaseComponent,
  },
  {
    path: '',
    redirectTo: '/purchase',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/purchase',
  },
];
