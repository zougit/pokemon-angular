import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  @Input() page: string = '';

  userName: any;
  password: any;
  formdata: any;
  user: any;
  token!: string;

  constructor(
    private authservice: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.formdata = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      role: "user",
    });
  }

  onClickSubmit() {
    console.log("page ",this.page);
    
    this.user = {
      username: this.formdata.value.userName,
      password: this.formdata.value.password,
      role: this.formdata.value.role
    };

    if (this.page == 'login') {
      this.authservice.login(this.user).subscribe((response) => {
        console.log(response);
        this.token = response.token;
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['']);
      });
    }

    if (this.page == 'signup') {      
      this.authservice.createUser(this.user).subscribe(() => {
        console.log("test");
        // this.token = response.token;
        // localStorage.setItem('token', response.token);
        // localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['']);
      });
    }
  }
}
