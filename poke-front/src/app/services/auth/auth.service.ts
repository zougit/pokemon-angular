import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserProps } from '../../models/User.model';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

  public createUser(userInfo: User): Observable<User> {
    return this.http.post<User>(environment.apiUrl + 'auth/subscribe', {
        "username": userInfo.username,
        "password": userInfo.password,
      })
      .pipe(catchError(this.handleError));
  }

  public login(userInfo: User) {
    return this.http.post<any>(environment.apiUrl + 'auth/login', {
      "username": userInfo.username,
      "password": userInfo.password,
    })
    .pipe(catchError(this.handleError));
  }
  
  public getUserFrom() {
    return this.http.get<UserProps>(environment.apiUrl + 'auth/'+ "630c947b4365ce8d7fd86d08") ;
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(environment.apiUrl + 'auth/'+ user.id, {
      "username": user.username,
      "password": user.password,
    } )
      .pipe(
        catchError(this.handleError)
      );
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
