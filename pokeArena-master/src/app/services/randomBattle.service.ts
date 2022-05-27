import { Injectable, OnInit } from '@angular/core';
import { forkJoin, Observable, Subscriber, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { BattleInfoProps, LogProps } from '../models/battleLog.model';
import { Move } from '../models/move.model';
import { Player } from '../models/player.model';
import { Pokemon } from '../models/Pokemon.model';
import { PokemonService } from './pokemon.service';
import { Itype, TypesService } from './tabTypes.service'

@Injectable({
  providedIn: 'root'
})
export class RandomBattleService{
  static player = new Array<string>(2);
  pokemons = new Array<Pokemon>(2);
  public toggler = false

  constructor(private pokemonService: PokemonService, private typesService: TypesService) { }

  addPlayers(names: string[]): void{
    RandomBattleService.player[0] = names[0];
    RandomBattleService.player[1] = names[1];
  }

  addPokemons(pokemons: Array<number>): Observable<Pokemon[]>{
    return forkJoin(pokemons.map((pokemon: number): Observable<Pokemon> => {
      return this.pokemonService.getPokemonById(pokemon);
    })).pipe(map((poke: Pokemon[]): Pokemon[] => {
        poke.forEach((pokemon: Pokemon, index: number): void => {
          this.pokemons[index] = new Pokemon(pokemon);
        });
        return this.pokemons;
    }));
  }

  battle(): Observable<BattleInfoProps>{
    console.log(RandomBattleService.player);
    let attacker = this.whoIsMoreSpeed();
    let defender = attacker === 1 ? 0 : 1;
    return new Observable<BattleInfoProps>(subscriber => {
      const fight = timer(0, 1000).subscribe(response => {
        if (this.toggler === true) {
          let log = '';
          const move = this.pokemons[attacker].choseRandomMove();
          const damage = this.calculDamage(
            attacker,
            defender,
            move
          );

          log = this.pokemons[attacker].name + ' attack ' + this.pokemons[defender].name
                + ' with ' + move.name + '. ' + this.pokemons[defender].name + ' lose ' + damage + 'hp.';
          
          let def = Itype.get(this.pokemons[defender].type) === undefined ? 0 : Itype.get(this.pokemons[defender].type)
          let atk = Itype.get(move.type) === undefined ? 0 : Itype.get(move.type)
          //@ts-ignore
          if (this.typesService.multi[atk-1][def-1] === 2) {
            log += "\n THAT'S SUPER EFFECTIVE";
          }
          //@ts-ignore
          if (this.typesService.multi[atk-1][def-1] === 0.5) {
            log += "\n NOT VERY EFFECTIVE";
          }
          //@ts-ignore
          if (this.typesService.multi[atk-1][def-1] === 2) {
            log += "\n NO EFFECT";
          }

          attacker = attacker === 1 ? 0 : 1;
          defender = defender === 0 ? 1 : 0;
          subscriber.next({pokemons: this.pokemons, log: {text: log, color: this.pokemons[attacker] === this.pokemons[0] ? 0 : 1}});

          const winner = this.whoWin();
        
          if (winner !== -1){
            const loser = winner === 0 ? 1 : 0;

            log = this.pokemons[loser].name + ' is KO.';
            subscriber.next({pokemons: this.pokemons, log: {text: log, color: 2, winner}});
            fight.unsubscribe();
          }
        
        }
        });
    });
  }

  whoWin(): number{
    if (this.pokemons[0].hp <= 0){
      this.pokemons[0].hp = 0;
      return 1;
    }

    if (this.pokemons[1].hp <= 0){
      this.pokemons[1].hp = 0;
      return 0;
    }

    return -1;
  }


  calculDamage(attacker: number, defender: number, move: Move): number{
    let damage = 0;
    
    let def = Itype.get(this.pokemons[defender].type) === undefined ? 0 : Itype.get(this.pokemons[defender].type)
    let atk = Itype.get(move.type) === undefined ? 0 : Itype.get(move.type)
    //@ts-ignore
    console.log("multi =",this.typesService.multi[atk-1][def-1]) 
    if (move.power !== null){
        //@ts-ignore
        damage = Math.floor((move.power * 0.005 * this.pokemons[attacker].atk * 0.01 * this.pokemons[defender].def)*this.typesService.multi[atk-1][def-1]);
        damage = damage < 0 ? 0 : damage;
        console.log("dmg =",damage);
    }


    this.pokemons[defender].hp -= damage;

    return damage;
}

  whoIsMoreSpeed(random = Math.random): number{
    if  (this.pokemons[0].speed !== this.pokemons[1].speed){
        return this.pokemons[0].speed > this.pokemons[1].speed ? 0 : 1;
    }else{
        return random() < 0.5 ? 0  : 1;
    }
}

}
