import { Move } from "./move";

export interface PokemonProps{
    name: string;
    hp: number;
    hpMax: number;
    atk: number;
    def: number;
    spAtk: number;
    spDef: number;
    speed: number;
    type: string;
    moves?: Move[];
    id: number;
    nameFR: string;
    evolution: string | null; 
    is_legendary: boolean;
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
    type: string;
    moves: Move[] = [];
    id: number;
    nameFR: string;
    evolution: string | null; 
    is_legendary: boolean;

    constructor(pokemon: PokemonProps){
        this.name = pokemon.name;
        this.hp = pokemon.hp;
        this.hpMax = pokemon.hpMax;
        this.atk = pokemon.atk;
        this.def = pokemon.def;
        this.spAtk = pokemon.spAtk;
        this.spDef = pokemon.spDef;
        this.speed = pokemon.speed;
        this.type = pokemon.type;
        this.id = pokemon.id;
        this.nameFR = pokemon.nameFR;
        this.evolution = pokemon.evolution;
        this.is_legendary = pokemon.is_legendary;
    };

    isDead(): Boolean {
        return this.hp <= 0 ? true : false;
    }

    choseRandomMove(random = Math.random): Move{
        return this.moves[Math.floor(random() * this.moves.length)];
    }

    

}