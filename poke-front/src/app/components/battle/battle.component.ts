import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';

import { Pokemon } from 'src/app/models/Pokemon.model';
import { BattleService } from 'src/app/services/battle/battle.service';

import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { BattleInfoProps, LogProps } from 'src/app/models/battleLog.model';
import { Move } from 'src/app/models/move.model';
import { Team } from 'src/app/models/team.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogPokeComponent } from '../dialog/dialog-poke/dialog-poke.component';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss'],
})
export class battleComponent implements OnInit, OnDestroy {
  players: Array<string> = [];
  pokemons: Pokemon[][] = [[], []];
  pokemonsId!: number[][];
  logs = new Array<LogProps>();
  currentTime: number[] = [];
  cp: number[] = [0, 0];
  toggler = false;
  cpt = 0;
  page = ''

  constructor(
    private location: Location,
    private router: Router,
    private battleService: BattleService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.battleService.page = this.page = this.location.path().slice(1);

    this.toggler = false;
    this.players = BattleService.player;

    if (this.players[0] === undefined || this.players[1] === undefined) {
      this.players = ['Player 1', 'Player 2'];
    }

    this.battleService.pokemonsIdSub.subscribe((pokemonsId) => {
      this.pokemonsId = pokemonsId;
      localStorage.setItem('pokeId', JSON.stringify(pokemonsId));
    });

    this.battleService.pokemonsIdSub.next(
      JSON.parse(localStorage.getItem('pokeId')!)
    );

    this.battleService.currpoke = this.cp;

    if (this.pokemonsId) {
      this.battleService
        .addPokemons(this.pokemonsId)
        .pipe(
          mergeMap((pokemons: Pokemon[][]): Observable<BattleInfoProps> => {
            this.pokemons = pokemons;
            // console.log('poke component ', this.pokemons);

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
    this.toggle();
    if (this.cpt > 0) {
      this.cpt--;
    }
    console.log(move);
  }

  heal() {
    if (this.cpt == 0) {
      if (
        this.pokemons[0][this.cp[0]].hp + 30 >
        this.pokemons[0][this.cp[0]].hpMax
      ) {
        this.pokemons[0][this.cp[0]].hp = this.pokemons[0][this.cp[0]].hpMax;
      } else {
        this.pokemons[0][this.cp[0]].hp += 30;
      }
      this.cpt = 3;
    }
  }

  change() {
    const dialogRef = this.dialog.open(DialogPokeComponent, {
      data: this.pokemons[0],
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed', result);
      if (result) {
        console.log(
          'change',
          this.pokemons[0].findIndex((x) => x.id == result.id)
        );

        this.cp[0] = this.pokemons[0].findIndex((x) => x.id == result.id);
      }
    });
  }

  ngOnDestroy(): void {
    localStorage.removeItem('pokeId');
  }
}
