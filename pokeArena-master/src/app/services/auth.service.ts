import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserProps } from '../models/User.model';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Session } from '../models/Session.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  user: User | undefined
  token: string | undefined;

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
    this.user = userInfo;
    return this.http.post<User>(environment.apiUrl + 'auth/subscribe', {
        "login": userInfo.login,
        "password": userInfo.password,
        "student": userInfo.student,
        "subscription": userInfo.subscription
      })
      .pipe(catchError(this.handleError));
  }

  public login(userInfo: User) {
    return this.http.post<Session>(environment.apiUrl + 'auth/login', {
      "login": userInfo.login,
      "password": userInfo.password,
    })
    .pipe(catchError(this.handleError));
  }

  public setToken(token: string) {
    this.token = token;
  }
  
  public getUserFrom() {
    console.log(this.token);
    return this.http.get<UserProps>(environment.apiUrl + 'auth/'+ "630c947b4365ce8d7fd86d08") ;
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(environment.apiUrl + 'auth/'+ user._id, {
      "login": user.login,
      "password": user.password,
      "student": user.student,
      "subscription": user.subscription
    } )
      .pipe(
        catchError(this.handleError)
      );
  }

}
