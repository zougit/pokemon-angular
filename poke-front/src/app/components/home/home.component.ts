import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLogged = false;
  user!: User;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLogged = this.authService.isAuthenticated();
    this.user = JSON.parse(localStorage.getItem('user')!);
  }

  disconnect() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }
}
