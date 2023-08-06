import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Pokemon } from 'src/app/models/Pokemon.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private http: HttpClient) {}

  getTeam(id: number) {
    return this.http.get<any>(environment.apiUrl + 'team/getById/' + id);
  }

  addPokeTeam(pokebd: any) {
    return this.http
      .put(environment.apiUrl + 'team/addpoke/' + pokebd.id_poke, pokebd)
      .subscribe((poke) => console.log(poke));
  }

  delPokeTeam(pokebd: any) {
    return this.http
      .put(environment.apiUrl + 'team/delpoke/' + pokebd.id_poke, pokebd)
      .subscribe((poke) => console.log(poke));
  }
}
