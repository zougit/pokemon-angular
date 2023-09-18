import { Injectable } from '@angular/core';
import { forkJoin, interval, Observable, ReplaySubject } from 'rxjs';
import { filter, map, take, takeWhile } from 'rxjs/operators';
import { BattleInfoProps } from '../../models/battleLog.model';
import { Move } from '../../models/move.model';
import { Pokemon } from '../../models/Pokemon.model';
import { PokemonService } from '../pokemon/pokemon.service';
import { Itype, TypesService } from '../tabTypes.service';
import { User } from 'src/app/models/user.model';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class BattleService {
  static player = new Array<string>(2);
  pokemons: Pokemon[][] = [];
  pokemonsIdSub: ReplaySubject<number[][]>;
  currpoke!: number[];
  public toggler = true;
  public move!: Move | null;
  user!: User;
  page!: string;

  constructor(
    private pokemonService: PokemonService,
    private typesService: TypesService,
    private userService: UserService
  ) {
    this.pokemonsIdSub = new ReplaySubject<number[][]>();
    this.user = JSON.parse(localStorage.getItem('user')!) ?? null;
    console.log('user', this.user);
  }

  addPlayers(names: string[]): void {
    BattleService.player[0] = names[0];
    BattleService.player[1] = names[1];
  }

  addPokemons(pokeIds: number[][]): Observable<Pokemon[][]> {
    this.pokemons = [];

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
        pokeGroups.forEach((pokeGroup: Pokemon[], index) => {
          const updatedGroup: Pokemon[] = pokeGroup.map(
            (pokemon: Pokemon, index) => {
              // console.log('pokemon ', pokemon);

              let poke = new Pokemon(pokemon);
              if (this.user && index == 0 && this.page == 'arena') {
                poke.lvl = this.user ? this.user.pokemons[index].lvl : 99;
                poke.exp = this.user ? this.user.pokemons[index].exp : 0;
                poke.expMax = this.user ? this.user.pokemons[index].expMax : 0;
              }

              let stats = {
                hp: poke.hp,
                hpMax: poke.hpMax,
                atk: poke.atk,
                def: poke.def,
                spAtk: poke.spAtk,
                spDef: poke.spDef,
                speed: poke.speed,
              };

              for (const key in stats) {
                if (Object.prototype.hasOwnProperty.call(poke, key)) {
                  if (key == 'hp' || key == 'hpMax') {
                    poke[key as keyof typeof stats] = Math.floor(
                      stats[key as keyof typeof stats] * poke.lvl
                    );
                  } else {
                    poke[key as keyof typeof stats] = Math.floor(
                      stats[key as keyof typeof stats] *
                        (poke.lvl * (poke.lvl / 1000))
                    );
                  }
                }
              }
              console.log(poke);

              return poke;
            }
          );
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
        let log = '';
        let move = null;
        if (this.move) {
          move = this.move;
          console.log('service move : ', move);
        } else {
          move =
            this.pokemons[attacker][this.currpoke[attacker]].choseRandomMove();
          console.log('service random move : ', move);
          this.toggler = false;
        }

        let damage;
        if (move.power) {
          damage = this.calculDamage(attacker, defender, move!);
        }

        let def =
          Itype.get(this.pokemons[defender][this.currpoke[defender]].type) ?? 0;
        let atk = Itype.get(move!.type) ?? 0;

        if (damage || damage == 0) {
          log =
            this.pokemons[attacker][this.currpoke[attacker]].name +
            ' attack ' +
            this.pokemons[defender][this.currpoke[defender]].name +
            ' with ' +
            move!.name +
            '. ' +
            this.pokemons[defender][this.currpoke[defender]].name +
            ' lose ' +
            damage +
            'hp.';

          if (this.typesService.multi[atk - 1][def - 1] === 2) {
            log += "\n THAT'S SUPER EFFECTIVE";
          }

          if (this.typesService.multi[atk - 1][def - 1] === 0.5) {
            log += '\n NOT VERY EFFECTIVE';
          }

          if (this.typesService.multi[atk - 1][def - 1] === 0) {
            log += '\n NO EFFECT';
          }
        } else {
          log =
            this.pokemons[attacker][this.currpoke[attacker]].name +
            ' use ' +
            move!.name;
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
          let log = this.pokemons[loser][this.currpoke[loser]].name + ' is KO.';

          this.currpoke[loser] =
            this.currpoke[loser] < this.pokemons[loser].length
              ? this.currpoke[loser] + 1
              : this.currpoke[loser];

          if (this.user && winner == 0 && this.page == 'arena') {
            this.pokemons[winner][this.currpoke[winner]].exp +=
              5 * this.pokemons[loser][this.currpoke[loser]].lvl;
            this.lvling();
          }

          return {
            pokemons: this.pokemons,
            log: { text: log, color: 2, winner },
          };
        }
        if (winnerTeam !== -1) {
          isover = true;
          if (this.user && winnerTeam == 0 && this.page == 'arena') {
            this.user.money += 50 * (this.moyenneLvl() / 10);
            this.userService.updateUser(this.user); //TODO - tester ça
            this.user.teams[0].pokemons = this.user.teams[0].pokemons.map(
              (x, i) => {
                x.name = this.pokemons[0][i].name;
                x.exp = this.pokemons[0][i].exp;
                x.expMax = this.pokemons[0][i].expMax;
                x.lvl = this.pokemons[0][i].lvl;

                this.pokemonService.updatePokeDb(x, this.user.id);
                return x;
              }
            );
            localStorage.setItem('user', JSON.stringify(this.user));
          }
        }
        return battleLog;
      })
    );
  }

  moyenneLvl() {
    return (
      this.pokemons[1].reduce(
        (accumulator, currentValue) => accumulator + currentValue.lvl,
        0
      ) / this.pokemons[1].length
    );
  }

  lvling() {
    if (
      this.pokemons[0][this.currpoke[0]].exp !== undefined &&
      this.pokemons[0][this.currpoke[0]].exp >=
        this.pokemons[0][this.currpoke[0]].expMax
    ) {
      this.pokemons[0][this.currpoke[0]].exp = 0;
      this.pokemons[0][this.currpoke[0]].expMax += 10;
      this.pokemons[0][this.currpoke[0]].lvl++;
      if (
        (this.pokemons[0][this.currpoke[0]].lvl == 16 &&
          this.pokemons[0][this.currpoke[0]].tier == 1) ||
        (this.pokemons[0][this.currpoke[0]].lvl == 45 &&
          this.pokemons[0][this.currpoke[0]].tier == 2)
      ) {
        let pokename = this.pokemons[0][this.currpoke[0]].evolution;
        this.pokemonService
          .getPokemon(pokename)
          .pipe(take(1))
          .subscribe((pokeEvo) => {
            let poke = new Pokemon(pokeEvo);
            poke.exp = this.pokemons[0][this.currpoke[0]].exp;
            poke.expMax = this.pokemons[0][this.currpoke[0]].expMax;
            poke.lvl = this.pokemons[0][this.currpoke[0]].lvl;
            this.pokemons[0][this.currpoke[0]] = poke;
          });
      }
    }
  }

  whoWin(): number {
    if (this.pokemons[0][this.currpoke[0]].hp <= 0) {
      // this.pokemons[0][this.currpoke[0]].hp = 0;
      return 1;
    }

    if (this.pokemons[1][this.currpoke[1]].hp <= 0) {
      // this.pokemons[1][this.currpoke[1]].hp = 0;
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
      Itype.get(this.pokemons[defender][this.currpoke[defender]].type) ?? 0;
    if (move.power !== null) {
      damage = Math.floor(
        move.power *
          0.005 *
          this.pokemons[attacker][this.currpoke[attacker]].atk *
          0.01 *
          this.pokemons[defender][this.currpoke[defender]].def *
          this.typesService.multi[atk - 1][def - 1]
      );
      damage = damage < 0 ? 0 : damage;
    }

    this.pokemons[defender][this.currpoke[defender]].hp -= damage;

    return damage;
  }

  whoIsMoreSpeed(random = Math.random): number {
    if (
      this.pokemons[0][this.currpoke[0]].speed !==
      this.pokemons[1][this.currpoke[1]].speed
    ) {
      return this.pokemons[0][this.currpoke[0]].speed >
        this.pokemons[1][this.currpoke[1]].speed
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
