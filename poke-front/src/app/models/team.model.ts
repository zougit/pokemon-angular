import { Pokemon } from './pokemon.model';

export class Team {
  id!: string;
  name: string;
  pokemons: Pokemon[];

  constructor(pokemons: Pokemon[], name: string) {
    this.pokemons = pokemons;
    this.name = name;
  }
}
