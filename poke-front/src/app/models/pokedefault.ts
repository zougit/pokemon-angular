import { Move } from './move.model';
import { Pokemon } from './Pokemon.model';

const pokemonDefault = new Pokemon ({
    name: 'default',
    hp: 0,
    hpMax: 0,
    atk: 0,
    def: 0,
    spAtk: 0,
    spDef: 0,
    speed: 0,
    type: "normal",
    id: 0,

    moves: []
});

export default pokemonDefault;
