import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { FormsModule } from '@angular/forms';
import { ProductManagementComponent } from "./product-management/product-management.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [ProductManagementComponent],
})
export class AppComponent {
  title = 'TallerIDWMFrontendWeb';
}
