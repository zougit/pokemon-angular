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
import { Pokemon } from '../../models/Pokemon.model';
import { PokemonService } from '../pokemon/pokemon.service';
import { Itype, TypesService } from '../tabTypes.service';

@Injectable({
  providedIn: 'root',
})
export class BattleService {
  static player = new Array<string>(2);
  pokemons: Pokemon[] = [];
  pokemonsTest: Pokemon[][] = [];
  pokemonsIdSub: ReplaySubject<number[][]>;
  pokemonsSub: AsyncSubject<Pokemon[][]>;
  public toggler = true;
  public move!: Move | null;

  constructor(
    private pokemonService: PokemonService,
    private typesService: TypesService
  ) {
    this.pokemonsIdSub = new ReplaySubject<number[][]>();
    this.pokemonsSub = new AsyncSubject<Pokemon[][]>();
  }

  addPlayers(names: string[]): void {
    BattleService.player[0] = names[0];
    BattleService.player[1] = names[1];
  }

  addPokemons(pokemons: Array<number>): Observable<Pokemon[]> {
    return forkJoin(
      pokemons.map((pokemon: number): Observable<Pokemon> => {
        return this.pokemonService.getPokemonById(pokemon);
      })
    ).pipe(
      map((poke: Pokemon[]): Pokemon[] => {
        poke.forEach((pokemon: Pokemon, index: number): void => {
          this.pokemons[index] = new Pokemon(pokemon);
        });
        return this.pokemons;
      })
    );
  }

  // addtest2(pokemons: number[][]) {
  //   // console.log('ids : ', pokemons);

  //   pokemons
  //     .map((pokemons: number[]): Observable<Pokemon>[] => {
  //       // console.log('pokemons ids : ', pokemons);
  //       return pokemons.map((pokemon: number): Observable<Pokemon> => {
  //         // console.log('id : ', pokemon);
  //         return this.pokemonService.getPokemonById(pokemon);
  //       });
  //     })
  //     .forEach((pokemons,i) => {
  //       // console.log(pokemons);
  //       this.pokemons[i] = []
  //       pokemons.forEach((pokemon, index) => {
  //         pokemon.subscribe((poke) => {
  //           // console.log(poke);
  //           this.pokemons[i].push(new Pokemon(poke));
  //         });
  //       });
  //     });

  //   console.log('poke service ', this.pokemons[0].length);

  //   return this.pokemons;
  // }

  addtest(pokeIds: number[][]): Observable<Pokemon[][]> {
    // console.log('ids : ', pokeIds);
    // let pokemons = [];
    // pokemons.push(pokeIds[0].split(','));
    // pokemons.push(pokeIds[1].split(','));
    // console.log(pokemons);

    let pokemonsObs = pokeIds.map(
      (pokemons: number[]): Observable<Pokemon>[] => {
        // console.log('id : ', pokemon);
        return pokemons.map((pokemon: number): Observable<Pokemon> => {
          // console.log('id : ', +pokemon);
          return this.pokemonService.getPokemonById(+pokemon);
        });
      }
    );

    // return map(() => forkJoin(pokemonsObs)).pipe(
    //   map((poke: Observable<Pokemon>[][]): Pokemon[][] => {
    //     // console.log('poke service', poke);

    //     poke.forEach((pokemons, i) => {
    //       console.log(i);
    //       this.pokemonsTest[i] = [];
    //       pokemons.forEach(
    //         (poke, index) => (this.pokemonsTest[i][index] = new Pokemon(poke))
    //       );
    //       return this.pokemonsTest;
    //     });
    //   })
    // );

    return this.test(pokemonsObs);
  }

  test(pokemonsObs: Observable<Pokemon>[][]): Observable<Pokemon[][]> {
    return of(pokemonsObs).pipe(
      map((poke: Observable<Pokemon>[][]): Pokemon[][] => {
        // console.log('poke service', poke);

        poke.forEach((pokemons, i) => {
          console.log(i);
          this.pokemonsTest[i] = [];
          pokemons.forEach((pokeSub, index) => {
            pokeSub.subscribe((poke) => {
              this.pokemonsTest[i][index] = new Pokemon(poke);
            });
          });
        });
        return this.pokemonsTest;
      })
    );
  }

  battle(): Observable<BattleInfoProps> {
    // this.pokemonsSub
    // .asObservable()
    // .subscribe((poke) => console.log('sub poke ', poke));

    let attacker = this.whoIsMoreSpeed();
    // let attacker = 1;
    let defender = attacker === 1 ? 0 : 1;
    let isover = false;
    const fight = interval(1000);
    this.toggler = attacker === 0 ? false : true;
    return fight.pipe(
      filter(() => this.toggler === true),
      takeWhile(() => isover === false),
      map((): BattleInfoProps => {
        console.log('poke fight ', this.pokemonsSub);

        let log = '';
        let move = null;
        if (this.move) {
          move = this.move;
          console.log('service move : ', move);
        } else {
          move = this.pokemons[attacker].choseRandomMove();
          console.log('service random move : ', move);
          this.toggler = false;
        }

        const damage = this.calculDamage(attacker, defender, move!);

        log =
          this.pokemons[attacker].name +
          ' attack ' +
          this.pokemons[defender].name +
          ' with ' +
          move!.name +
          '. ' +
          this.pokemons[defender].name +
          ' lose ' +
          damage +
          'hp.';

        let def = Itype.get(this.pokemons[defender].type) ?? 0;
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

        if (winner !== -1) {
          const loser = winner === 0 ? 1 : 0;
          let log = this.pokemons[loser].name + ' is KO.';
          isover = true;
          return {
            pokemons: this.pokemons,
            log: { text: log, color: 2, winner },
          };
        }
        return battleLog;
      })
    );
  }

  whoWin(): number {
    if (this.pokemons[0].hp <= 0) {
      this.pokemons[0].hp = 0;
      return 1;
    }

    if (this.pokemons[1].hp <= 0) {
      this.pokemons[1].hp = 0;
      return 0;
    }

    return -1;
  }

  calculDamage(attacker: number, defender: number, move: Move): number {
    let damage = 0;

    let atk = Itype.get(move.type) ?? 0;
    let def = Itype.get(this.pokemons[defender].type) ?? 0;
    if (move.power !== null) {
      damage = Math.floor(
        move.power *
          0.005 *
          this.pokemons[attacker].atk *
          0.01 *
          this.pokemons[defender].def *
          this.typesService.multi[atk - 1][def - 1]
      );
      damage = damage < 0 ? 0 : damage;
    }

    this.pokemons[defender].hp -= damage;

    return damage;
  }

  whoIsMoreSpeed(random = Math.random): number {
    // return +this.pokemonsSub.asObservable().subscribe((poke) => {
    //   console.log("poke speed",poke[0][0]);
      
    //   if (poke[0][0].speed !== poke[1][0].speed) {
    //     return poke[0][0].speed > poke[1][0].speed ? 0 : 1;
    //   } else {
    //     return random() < 0.5 ? 0 : 1;
    //   }
    // });
    
    if (this.pokemons[0].speed !== this.pokemons[1].speed) {
      return this.pokemons[0].speed > this.pokemons[1].speed ? 0 : 1;
    } else {
      return random() < 0.5 ? 0 : 1;
    }
  }
}
