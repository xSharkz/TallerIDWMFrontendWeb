import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { HomeproductComponent } from './HomeProductManagement/components/homeproduct/homeproduct.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule,HomeproductComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TallerIDWMFrontendWeb';

  ngOnInit(): void {
      initFlowbite();
  }
}
