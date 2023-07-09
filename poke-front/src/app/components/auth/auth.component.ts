import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(private authservice: AuthService, private router: Router) {}
  userName: any;
  password: any;
  formdata: any;
  user: any;
  token!: string ;
  
  ngOnInit() {
    this.formdata = new FormGroup({
      userName: new FormControl(''),
      password: new FormControl(''),
    }); 
  }

  onClickSubmit(data: { userName: any; password: any; }) {
    this.user = {
      login: data.userName,
      password: data.password
    }
    
    this.authservice.login(this.user).subscribe(response => {
      this.token = response.token
      this.authservice.setToken(this.token)
    })
    this.router.navigate(['accueil'])
  }
}
