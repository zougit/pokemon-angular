import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from '../../models/Pokemon.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PokeCardProps } from '../../models/pokeCard.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  getPokemon(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(
      environment.apiUrl + 'poke/getPoke/' + name
    );
  }

  getPokemonById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(environment.apiUrl + 'poke/getPoke/' + id);
  }

  getAll(): Observable<Array<PokeCardProps>> {
    return this.http.get<Array<PokeCardProps>>(
      environment.apiUrl + 'poke/getAll'
    );
  }

  getPokeDbByUser(userId: number) {
    return this.http.get<any>(environment.apiUrl + 'pokedb/getAll/' + userId);
  }

  addPokeDb(poke: any) {
    return this.http
      .post<any>(environment.apiUrl + 'pokedb/add', poke)
      .subscribe((x) => console.log("add ",x));
  }

  updatePokeDb(poke: any,userId : string) {
    return this.http
      .put<any>(environment.apiUrl + 'pokedb/update/'+ poke.id+ userId,poke)
  }

}
