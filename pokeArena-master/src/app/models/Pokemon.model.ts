import { Move } from './move.model';

export interface PokemonProps{
    name: string;
    hp: number;
    hpMax: number;
    atk: number;
    def: number;
    spAtk: number;
    spDef: number;
    speed: number;
    moves: Move[];
    id: number;

}


export class Pokemon implements PokemonProps{
    name: string;
    hp: number;
    hpMax: number;
    atk: number;
    def: number;
    spAtk: number;
    spDef: number;
    speed: number;
    moves: Move[];
    id: number;


    constructor(pokemon: PokemonProps){
        this.name = pokemon.name;
        this.hp = pokemon.hp;
        this.hpMax = pokemon.hpMax;
        this.atk = pokemon.atk;
        this.def = pokemon.def;
        this.spAtk = pokemon.spAtk;
        this.spDef = pokemon.spDef;
        this.speed = pokemon.speed;
        this.id = pokemon.id;

        this.moves = pokemon.moves;

    }

    isDead(): boolean {
        return this.hp <= 0 ? true : false;
    }

    choseRandomMove(random = Math.random): Move{
      return this.moves[Math.floor(random() * this.moves.length)];
    }



}
