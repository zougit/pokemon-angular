import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon.model';
import { BattleService } from 'src/app/services/battle/battle.service';

import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { BattleInfoProps, LogProps } from 'src/app/models/battleLog.model';
import { Move } from 'src/app/models/move.model';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss'],
})
export class battleComponent implements OnInit {
  players: Array<string> = [];
  pokemons: Pokemon[][] = [[], []];
  pokemonsId!: number[][];
  logs = new Array<LogProps>();
  currentTime: number[] = [];
  cp: number[] = [0, 2];
  toggler = false;

  constructor(private router: Router, private battleService: BattleService) {}

  ngOnInit(): void {
    this.toggler = false;
    this.players = BattleService.player;

    if (this.players[0] === undefined || this.players[1] === undefined) {
      this.players = ['Player 1', 'Player 2'];
    }

    this.battleService.pokemonsIdSub.next(
      JSON.parse(localStorage.getItem('pokeId')!)
    );

    this.battleService.pokemonsIdSub.subscribe((pokemonsId) => {
      this.pokemonsId = pokemonsId;
      localStorage.setItem('pokeId', JSON.stringify(pokemonsId));
      // console.log('ids : ', pokemonsId);
    });
    this.battleService.currpoke = [0, 0];

    if (this.pokemonsId) {
      this.battleService
        .addPokemons(this.pokemonsId)
        .pipe(
          mergeMap((pokemons: Pokemon[][]): Observable<BattleInfoProps> => {
            this.pokemons = pokemons;
            console.log('poke component ', this.pokemons);

            return this.battleService.battle();
          })
        )
        .subscribe({
          next: (response) => {
            this.currentTime.push(Date.now());
            this.pokemons = response.pokemons;
            this.logs.push(response.log);
            console.log('response', response.log);
            console.log('log', this.logs);
            this.cp = this.battleService.currpoke;
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }

  toggle() {
    this.battleService.toggler = !this.battleService.toggler;
    this.toggler = !this.toggler;
  }

  atkMove(move: Move) {
    this.battleService.move = move;
    this.battleService.toggler = !this.battleService.toggler;
    this.toggler = this.battleService.toggler;

    console.log(move);
  }

  lastPage(): void {
    this.router.navigate(['pokeChoice']);
  }
}
