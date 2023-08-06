import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Pokemon, PokemonProps } from '../../models/Pokemon.model';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PokeCardProps } from '../../models/pokeCard.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(@Inject(HttpClient) private http: HttpClient) {}

  getPokemon(name: string): Observable<PokemonProps> {
    return this.http.get<PokemonProps>(
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
}
