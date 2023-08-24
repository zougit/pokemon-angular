import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { User } from './models/user.model';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Pokemon';

  isLogged = false;
  user!: User;

  constructor(
    private location: Location,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
