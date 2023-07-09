import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from 'src/app/models/Pokemon.model';
import { RandomBattleService } from 'src/app/services/randomBattle.service';

import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { BattleInfoProps, LogProps } from 'src/app/models/battleLog.model';

@Component({
  selector: 'app-random-battle',
  templateUrl: './random-battle.component.html',
  styleUrls: ['./random-battle.component.scss']
})
export class RandomBattleComponent implements OnInit {
  players: Array<string> = [];
  pokemons: Pokemon[] = [];
  logs = new Array<LogProps>();
  currentTime: number[] = [];
  toggler = false 

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private randomBattleService: RandomBattleService) { }

  ngOnInit(): void {
    this.players = RandomBattleService.player;

    if (this.players[0] === undefined || this.players[1] === undefined){
      this.players = ['Player 1', 'Player 2'];
    }

    this.activatedRoute.queryParams.pipe(
      mergeMap((params): Observable<Pokemon[]> => {
        return this.randomBattleService.addPokemons(params['pokemonPlayer']);
      }),
      mergeMap((pokemons: Pokemon[]): Observable<BattleInfoProps> => {
        this.pokemons = pokemons;
        return this.randomBattleService.battle();
      })
    ).subscribe(response => {
      this.currentTime.push(Date.now());
      this.pokemons = response.pokemons;
      this.logs.push(response.log);
    }, error => {
      console.log(error);
    });
  }

  toggle(){
   this.randomBattleService.toggler = !this.randomBattleService.toggler
   this.toggler = !this.toggler
  }

  lastPage(): void{
    this.router.navigate(['pokeChoice']);
  }
}
