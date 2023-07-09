import { Pokemon } from './Pokemon.model';

export interface LogProps{
  text: string;
  color: number;
  winner?: number;
}

export interface BattleInfoProps{
  pokemons: Pokemon[];
  log: LogProps;
}
