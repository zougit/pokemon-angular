import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from 'src/app/models/Pokemon.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor( private http: HttpClient ) { }

  getTeam(id: number) {
    return this.http.get<any[]>(environment.apiUrl + 'team/getById/' + id);
  }

  addPokeTeam() {

  }

}
