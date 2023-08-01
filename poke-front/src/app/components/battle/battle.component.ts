import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from 'src/app/models/Pokemon.model';
import { BattleService } from 'src/app/services/battle/battle.service';

import { Observable } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
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
  toggler = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private battleService: BattleService
  ) {}

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
      console.log('ids : ', pokemonsId);
    });

    this.battleService
      .addtest(this.pokemonsId)
      .pipe(
        mergeMap((pokemons: Pokemon[][]): Observable<BattleInfoProps> => {
          this.pokemons = pokemons;
          console.log('poke component ', this.pokemons);

          this.battleService.pokemonsSub.next(pokemons);

          this.battleService.pokemonsSub.complete()

          return this.battleService.battle();
        })
      )
      .subscribe({
        next: (response) => {
          let currentTeam = this.pokemons[0] == response.pokemons ? 0 : 1;
          this.currentTime.push(Date.now());
          this.pokemons[currentTeam] = response.pokemons;
          this.logs.push(response.log);
        },
        error: (error) => {
          console.log(error);
        },
      });
    // .subscribe((pokemons) => console.log('add : ', pokemons));

    // this.route.queryParams
    //   .pipe(
    //     mergeMap((params, i) => {
    //       return this.battleService.addPokemons(params['pokemonPlayer']);
    //     }),
    //     mergeMap((pokemons: Pokemon[], i): Observable<BattleInfoProps> => {
    //       this.pokemons[i] = pokemons;
    //       console.log('poke component ', this.pokemons);

    //       return this.battleService.battle();
    //     })
    //   )
    //   .subscribe({
    //     next: (response) => {
    //       let currentTeam = this.pokemons[0] == response.pokemons ? 0 : 1;
    //       this.currentTime.push(Date.now());
    //       this.pokemons[currentTeam] = response.pokemons;
    //       this.logs.push(response.log);
    //     },
    //     error: (error) => {
    //       console.log(error);
    //     },
    //   });
  }

  toggle() {
    this.battleService.toggler = !this.battleService.toggler;
    this.toggler = !this.toggler;
  }

  atkMove(move: Move) {
    this.battleService.move = move;
    this.battleService.toggler = !this.battleService.toggler;
    this.toggler = !this.toggler;

    console.log(move);
  }

  lastPage(): void {
    this.router.navigate(['pokeChoice']);
  }
}
