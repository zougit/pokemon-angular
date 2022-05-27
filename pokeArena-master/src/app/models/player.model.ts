import { Pokemon } from './Pokemon.model';

export interface PlayerProps{
    name: string;

    pokemon: Pokemon[];
}

export class Player implements PlayerProps{
    name: string;
    pokemon: Pokemon[];

    constructor(name: string){
        this.name = name;
        this.pokemon = [];
    }

    addPokemonList(pokemon: Pokemon[]): void{
        this.pokemon = pokemon;
    }
}

