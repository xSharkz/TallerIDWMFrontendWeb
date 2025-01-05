import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule,],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private router:Router){}

  navigateTo(path: string): void{
    this.router.navigate([path]);
  }
  title = 'TallerIDWMFrontendWeb';

  ngOnInit(): void {
      initFlowbite();
  }
}
