import { Move } from './move.model';

export interface PokemonProps {
  name: string;
  lvl: number;
  exp: number;
  expMax: number;
  hp: number;
  hpMax: number;
  atk: number;
  def: number;
  spAtk: number;
  spDef: number;
  speed: number;
  type: string;
  moves: Move[];
  evo :string;
  tier: number;
  id: number;
}

export class Pokemon implements PokemonProps {
  name: string;
  lvl: number;
  exp: number;
  expMax: number;
  hp: number;
  hpMax: number;
  atk: number;
  def: number;
  spAtk: number;
  spDef: number;
  speed: number;
  type: string;
  moves: Move[];
  evo :string;
  tier: number;
  id: number;

  constructor(pokemon: PokemonProps) {
    this.name = pokemon.name;
    this.lvl = pokemon.lvl;
    this.exp = pokemon.exp;
    this.expMax = pokemon.expMax;
    this.hp = pokemon.hp;
    this.hpMax = pokemon.hpMax;
    this.atk = pokemon.atk;
    this.def = pokemon.def;
    this.spAtk = pokemon.spAtk;
    this.spDef = pokemon.spDef;
    this.speed = pokemon.speed;
    this.type = pokemon.type;
    this.evo = pokemon.evo;
    this.tier = pokemon.tier;
    this.id = pokemon.id;

    this.moves = pokemon.moves;
  }

  isDead(): boolean {
    return this.hp <= 0 ? true : false;
  }

  choseRandomMove(random = Math.random): Move {
    return this.moves[Math.floor(random() * this.moves.length)];
  }
}
