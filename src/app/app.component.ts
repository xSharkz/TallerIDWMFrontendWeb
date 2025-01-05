import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EditProfileComponent } from "./edit-profile/edit-profile.component";

@Component({
  selector: 'app-root',
  imports: [EditProfileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TallerIDWMFrontendWeb';
}
