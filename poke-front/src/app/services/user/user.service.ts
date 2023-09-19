import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(
      environment.apiUrl + 'user/update/' + user.id,
      user
    );
  }

  public getUserById(user: User): Observable<User> {
    return this.http.get<User>(environment.apiUrl + 'user/update/' + user.id);
  }

  public getAllUser(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + 'user/getall');
  }

  public deleteUser(user: User): Observable<any> {
    return this.http.delete<any>(environment.apiUrl + 'user/delete/'+user.id);
  }
}
