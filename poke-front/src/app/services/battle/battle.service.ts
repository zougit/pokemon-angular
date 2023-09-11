import { Injectable } from '@angular/core';
import {
  AsyncSubject,
  forkJoin,
  from,
  interval,
  Observable,
  of,
  pipe,
  ReplaySubject,
} from 'rxjs';
import { filter, isEmpty, map, takeWhile, toArray } from 'rxjs/operators';
import { BattleInfoProps } from '../../models/battleLog.model';
import { Move } from '../../models/move.model';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonService } from '../pokemon/pokemon.service';
import { Itype, TypesService } from '../tabTypes.service';

@Injectable({
  providedIn: 'root',
})
export class BattleService {
  static player = new Array<string>(2);
  // pokemons: Pokemon[] = [];
  pokemons: Pokemon[][] = [];
  pokemonsTest: Pokemon[][] = [];
  pokemonsIdSub: ReplaySubject<number[][]>;
  currentpokemons!: number[];
  public toggler = true;
  public move!: Move | null;

  constructor(
    private pokemonService: PokemonService,
    private typesService: TypesService
  ) {
    this.pokemonsIdSub = new ReplaySubject<number[][]>();
  }

  addPlayers(names: string[]): void {
    BattleService.player[0] = names[0];
    BattleService.player[1] = names[1];
  }

  addPokemons(pokeIds: number[][]): Observable<Pokemon[][]> {
    const observables: Observable<Pokemon[]>[] = pokeIds.map(
      (group: number[]) => {
        return forkJoin(
          group.map((pokemonId: number) => {
            return this.pokemonService.getPokemonById(pokemonId);
          })
        );
      }
    );

    return forkJoin(observables).pipe(
      map((pokeGroups: Pokemon[][]) => {
        pokeGroups.forEach((pokeGroup: Pokemon[]) => {
          const updatedGroup: Pokemon[] = pokeGroup.map((pokemon: Pokemon) => {
            return new Pokemon(pokemon);
          });
          this.pokemons.push(updatedGroup);
        });
        return this.pokemons;
      })
    );
  }

  battle(): Observable<BattleInfoProps> {
    console.log(this.pokemons);

    let attacker = this.whoIsMoreSpeed();
    // let attacker = 1;
    let defender = attacker === 1 ? 0 : 1;
    let isover = false;
    this.toggler = attacker === 0 ? false : true;
    const fight = interval(1000);
    return fight.pipe(
      filter(() => this.toggler === true),
      takeWhile(() => isover === false),
      map((): BattleInfoProps => {
        console.log(
          'poke fight atk',
          this.pokemons[attacker][this.currentpokemons[attacker]]
        );
        console.log(
          'poke fight def',
          this.pokemons[defender][this.currentpokemons[defender]]
        );

        let log = '';
        let move = null;
        if (this.move) {
          move = this.move;
          console.log('service move : ', move);
        } else {
          move =
            this.pokemons[attacker][
              this.currentpokemons[attacker]
            ].choseRandomMove();
          console.log('service random move : ', move);
          this.toggler = false;
        }

        const damage = this.calculDamage(attacker, defender, move!);

        log =
          this.pokemons[attacker][this.currentpokemons[attacker]].name +
          ' attack ' +
          this.pokemons[defender][this.currentpokemons[defender]].name +
          ' with ' +
          move!.name +
          '. ' +
          this.pokemons[defender][this.currentpokemons[defender]].name +
          ' lose ' +
          damage +
          'hp.';

        let def =
          Itype.get(
            this.pokemons[defender][this.currentpokemons[defender]].type
          ) ?? 0;
        let atk = Itype.get(move!.type) ?? 0;

        if (this.typesService.multi[atk - 1][def - 1] === 2 && damage != 0) {
          log += "\n THAT'S SUPER EFFECTIVE";
        }

        if (this.typesService.multi[atk - 1][def - 1] === 0.5 && damage != 0) {
          log += '\n NOT VERY EFFECTIVE';
        }

        if (this.typesService.multi[atk - 1][def - 1] === 0) {
          log += '\n NO EFFECT';
        }

        attacker = attacker === 1 ? 0 : 1;
        defender = defender === 0 ? 1 : 0;
        this.move = null;

        return {
          pokemons: this.pokemons,
          log: {
            text: log,
            color: this.pokemons[attacker] === this.pokemons[0] ? 0 : 1,
          },
        };
      }),
      map((battleLog: BattleInfoProps): BattleInfoProps => {
        const winner = this.whoWin();
        const winnerTeam = this.whichTeamWin();

        if (winner !== -1) {
          const loser = winner === 0 ? 1 : 0;
          let log =
            this.pokemons[loser][this.currentpokemons[loser]].name + ' is KO.';

          this.currentpokemons[loser] =
            this.currentpokemons[loser] < this.pokemons[loser].length
              ? this.currentpokemons[loser] + 1
              : this.currentpokemons[loser];

          return {
            pokemons: this.pokemons,
            log: { text: log, color: 2, winner },
          };
        }
        if (winnerTeam !== -1) {
          isover = true;
        }
        return battleLog;
      })
    );
  }

  whoWin(): number {
    if (this.pokemons[0][this.currentpokemons[0]].hp <= 0) {
      this.pokemons[0][this.currentpokemons[0]].hp = 0;
      return 1;
    }

    if (this.pokemons[1][this.currentpokemons[1]].hp <= 0) {
      this.pokemons[1][this.currentpokemons[1]].hp = 0;
      return 0;
    }

    return -1;
  }

  whichTeamWin(): number {
    if (
      this.pokemons[0].every((pokemon: Pokemon) => {
        return pokemon.hp <= 0;
      })
    ) {
      return 1;
    }

    if (
      this.pokemons[1].every((pokemon: Pokemon) => {
        return pokemon.hp <= 0;
      })
    ) {
      return 0;
    }

    return -1;
  }

  calculDamage(attacker: number, defender: number, move: Move): number {
    let damage = 0;

    let atk = Itype.get(move.type) ?? 0;
    let def =
      Itype.get(this.pokemons[defender][this.currentpokemons[defender]].type) ??
      0;
    if (move.power !== null) {
      damage = Math.floor(
        move.power *
          0.005 *
          this.pokemons[attacker][this.currentpokemons[attacker]].atk *
          0.01 *
          this.pokemons[defender][this.currentpokemons[defender]].def *
          this.typesService.multi[atk - 1][def - 1]
      );
      damage = damage < 0 ? 0 : damage;
    }

    this.pokemons[defender][this.currentpokemons[defender]].hp -= damage;

    return damage;
  }

  whoIsMoreSpeed(random = Math.random): number {
    if (
      this.pokemons[0][this.currentpokemons[0]].speed !==
      this.pokemons[1][this.currentpokemons[1]].speed
    ) {
      return this.pokemons[0][this.currentpokemons[0]].speed >
        this.pokemons[1][this.currentpokemons[1]].speed
        ? 0
        : 1;
    } else {
      return random() < 0.5 ? 0 : 1;
    }

    // if (this.pokemons[0].speed !== this.pokemons[1].speed) {
    //   return this.pokemons[0].speed > this.pokemons[1].speed ? 0 : 1;
    // } else {
    //   return random() < 0.5 ? 0 : 1;
    // }
  }
}
