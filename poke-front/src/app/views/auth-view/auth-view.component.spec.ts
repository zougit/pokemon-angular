import { ComponentFixture, TestBed } from '@angular/core/testing';

import {expect} from '@jest/globals';

import { AuthViewComponent } from './auth-view.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthComponent } from 'src/app/components/auth/auth.component';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth/auth.service';

describe('AuthViewComponent', () => {
  let component: AuthViewComponent;
  let fixture: ComponentFixture<AuthViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        BrowserModule,
        RouterTestingModule,
      ],
      declarations: [AuthViewComponent,AuthComponent],
      providers: [
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService,
        AuthService,
      ],
    });
    fixture = TestBed.createComponent(AuthViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
