import { Pokemon } from './pokemon.model';

export interface LogProps{
  text: string;
  color: number;
  winner?: number;
}

export interface BattleInfoProps{
  pokemons: Pokemon[];
  log: LogProps;
}
