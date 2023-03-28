import {Pokemon} from "../../models"
import PokeAPI, { IMove, IPokemon, IPokemonSpecies } from "pokeapi-typescript";
import { Move } from "../../models";
export class PokemonBuilder{

    private static instance: PokemonBuilder;

    public static async getInstance(): Promise<PokemonBuilder>{
        if(!PokemonBuilder.instance){
            PokemonBuilder.instance = new PokemonBuilder();
            return PokemonBuilder.instance;
        }
        return PokemonBuilder.instance;
    }

    public async create(name: string | number): Promise<Pokemon | null> {
        try {
            const pokemonApi = await PokeAPI.Pokemon.resolve(name);
            const pokeSpeciesApi = await PokeAPI.PokemonSpecies.resolve(name);

            const idEvoChain = pokeSpeciesApi.evolution_chain.url.split('/') ;
            let evo = await this.evolution(Number(idEvoChain[6]),pokeSpeciesApi);
            if (pokemonApi.name == evo) evo = "";
            
            const pokemon = new Pokemon({
                name: pokemonApi.name,
                hp: pokemonApi.stats[0].base_stat,
                hpMax: pokemonApi.stats[0].base_stat,
                atk: pokemonApi.stats[1].base_stat,
                def: pokemonApi.stats[2].base_stat,
                spAtk: pokemonApi.stats[3].base_stat,
                spDef: pokemonApi.stats[4].base_stat,
                speed: pokemonApi.stats[5].base_stat,
                type: pokemonApi.types[0].type.name ,
                id: pokemonApi.id,
                nameFR : pokeSpeciesApi.names[4].name,
                evolution : evo
            });

            await this.setMoveRandom(pokemon, pokemonApi)

            return pokemon;
        }
        catch{
            return null;
        }
    }

    // public async createById(id: number): Promise<Pokemon | null> {
    //     try {
    //         const pokemonApi = await PokeAPI.Pokemon.resolve(id);
    //         const pokemon = new Pokemon({
    //             name: pokemonApi.name,
    //             hp: pokemonApi.stats[0].base_stat,
    //             hpMax: pokemonApi.stats[0].base_stat,
    //             atk: pokemonApi.stats[1].base_stat,
    //             def: pokemonApi.stats[2].base_stat,
    //             spAtk: pokemonApi.stats[3].base_stat,
    //             spDef: pokemonApi.stats[4].base_stat,
    //             speed: pokemonApi.stats[5].base_stat,
    //             type: pokemonApi.types[0].type.name ,
    //             id: pokemonApi.id
    //         });

    //         await this.setMoveRandom(pokemon, pokemonApi)

    //         return pokemon;
    //     }
    //     catch{
    //         return null;
    //     }
    // }

    public async evolution(id :number, pokeSpecies : IPokemonSpecies) {
        const evolution_chain = await PokeAPI.EvolutionChain.resolve(id);
        let evolution;
        if (pokeSpecies.evolves_from_species != null) {
             evolution = evolution_chain.chain.evolves_to[0].evolves_to[0].species.name;
        }else {
             evolution = evolution_chain.chain.evolves_to[0].species.name;
        }
        
        return evolution;
    }

    public async setMoveRandom(pokemon: Pokemon, pokemonApi: IPokemon): Promise<void>{
        let movePosition: number;
        let moveApi: IMove;
        for (let i = 0; i < 4; i++) {
            do{
                movePosition = Math.floor(Math.random() * pokemonApi.moves.length);
                moveApi = await PokeAPI.Move.resolve(pokemonApi.moves[movePosition].move.name);
            }while(this.moveIsSet(pokemon, moveApi));

            pokemon.moves[i] = new Move({
                name: moveApi.name,
                accuracy: moveApi.accuracy,
                power: moveApi.power,
                pp: moveApi.pp,
                type: moveApi.type.name
            });
        }
    }

    public moveIsSet(pokemon: Pokemon, move: IMove): Boolean{

        pokemon.moves.forEach( element =>{
            if(element.name === move.name || move.power === null){
                return true;
            }
        });

        
        return false;
    }

}