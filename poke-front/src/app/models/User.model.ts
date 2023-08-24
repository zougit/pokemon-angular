import { Pokemon } from "./pokemon.model";
import { Team } from "./team.model";

export interface UserProps {
  id: string;
  username: string;
  password: string;
  role: string;
  money: number;
  teams: Team[];
  pokemons: Pokemon[];
}

export class User implements UserProps {
  id!: string;
  username: string;
  password: string;
  role: string;
  money: number;
  teams: Team[];
  pokemons: Pokemon[];

  constructor(user: UserProps) {
    this.username = user.username;
    this.password = user.password;
    this.role = user.role;
    this.money = user.money;
    this.teams = user.teams;
    this.pokemons = user.pokemons;
  }
}
