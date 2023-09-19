import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Pokemon';
  page!: string

  isLogged = false;
  user!: User;

  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.page = this.location.path().slice(1);   
    console.log('page',this.page);
     
    this.isLogged = this.authService.isAuthenticated();
    this.user = JSON.parse(localStorage.getItem('user')!);
  }
  ngOnchanges() {
    this.isLogged = this.authService.isAuthenticated();
  }

  disconnect() {
    localStorage.setItem('token', '');
    localStorage.setItem('user', '');
    this.router.navigate(['login']);
  }
}
