import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private router:Router){}

  isAuthenticated = false;
  navigateTo(path: string): void{
    this.router.navigate([path]);
  }
  title = 'TallerIDWMFrontendWeb';

  ngOnInit(): void {
      initFlowbite();
      this.checkAuthentication();
  }
  checkAuthentication(): void{
    const token = localStorage.getItem('token');
    this.isAuthenticated = !!token;
  }

  logout():void{
    localStorage.removeItem('token');
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }
}
