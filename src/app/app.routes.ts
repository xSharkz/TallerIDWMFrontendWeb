import { Routes} from '@angular/router';
import { LoginComponent } from './AuthManagement/components/login/login.component';
import { RegisterComponent } from './AuthManagement/components/register/register.component';
import { ClientmanagementComponent } from './UserManagement/components/clientmanagement/clientmanagement.component';
export const routes: Routes = [
  {path: 'register', component:RegisterComponent },
  {path: '', redirectTo:'/register', pathMatch:'full'},
  {path: 'login', component:LoginComponent },
  {path: '', redirectTo:'/login', pathMatch:'full'},
  {path: '', redirectTo: '/clients', pathMatch:'full'},
  {path: 'clients', component: ClientmanagementComponent}
];
