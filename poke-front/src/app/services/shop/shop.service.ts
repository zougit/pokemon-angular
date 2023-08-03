import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }

  getShopUser(userId: number) {
    return this.http.get<any[]>(environment.apiUrl + 'shop/get/' + userId);
  }
}
