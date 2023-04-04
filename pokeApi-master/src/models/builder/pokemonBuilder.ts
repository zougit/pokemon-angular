import { Pokemon } from "..";
import PokeAPI, { IMove, IName, INamedApiResource, IPokemon, IPokemonSpecies } from "pokeapi-typescript";
import { Move } from "..";
import { IEvolution } from "../evolution";

export class PokemonBuilder {
  private static instance: PokemonBuilder;

  public static async getInstance(): Promise<PokemonBuilder> {
    if (!PokemonBuilder.instance) {
      PokemonBuilder.instance = new PokemonBuilder();
      return PokemonBuilder.instance;
    }
    return PokemonBuilder.instance;
  }

  public async create(name: string | number): Promise<Pokemon | null> {
    try {
      const pokemonApi = await PokeAPI.Pokemon.resolve(name);
      // console.log("poke Api");
      // console.log(pokemonApi);
      const pokeSpeciesApi = await PokeAPI.PokemonSpecies.resolve(name);
      // console.log("poke Species Api");
      // console.log(pokeSpeciesApi);

      const idEvoChain = pokeSpeciesApi.evolution_chain.url.split("/");
      // let evo = await this.evolution(Number(idEvoChain[6]), pokeSpeciesApi);
      // if (pokemonApi.name == evo.name) {
      //   evo.name = "";
      //   evo.tier = 3;
      // }
      // console.log("debug 1");

      let is_legendary =
        pokeSpeciesApi.is_legendary || pokeSpeciesApi.is_mythical
          ? true
          : false;

      // console.log("debug 2");
      const pokemon = new Pokemon({
        name: pokemonApi.name,
        hp: pokemonApi.stats[0].base_stat,
        hpMax: pokemonApi.stats[0].base_stat,
        atk: pokemonApi.stats[1].base_stat,
        def: pokemonApi.stats[2].base_stat,
        spAtk: pokemonApi.stats[3].base_stat,
        spDef: pokemonApi.stats[4].base_stat,
        speed: pokemonApi.stats[5].base_stat,
        type: pokemonApi.types[0].type.name,
        id: pokemonApi.id,
        nameFR: pokeSpeciesApi.names[4].name,
        // evolution: evo.name,
        // tier: evo.tier,
        evolution: "",
        tier: 1,
        is_legendary: is_legendary,
      });

      // console.log("debug 3");
      await this.setMoveRandom(pokemon, pokemonApi);

      return pokemon;
    } catch {
      return null;
    }
  }

  public async evolution(id: number, pokeSpecies: IPokemonSpecies) {
    const evolution_chain = await PokeAPI.EvolutionChain.resolve(id);
    let evolution!: IEvolution;
    // console.log(evolution_chain.chain.evolves_to);

    if (evolution_chain.chain.evolves_to.length != 0) {
      if (pokeSpecies.evolves_from_species != null) {
        evolution.name =
          evolution_chain.chain.evolves_to[0].evolves_to[0].species.name;
        evolution.tier = 2;
      } else {
        evolution.name = evolution_chain.chain.evolves_to[0].species.name;
        evolution.tier = 1;
      }
    } else {
      evolution.name = "";
      evolution.tier = 1;
    }

    return evolution;
  }

  public async setMoveRandom(
    pokemon: Pokemon,
    pokemonApi: IPokemon
  ): Promise<void> {
    let movePosition: number;
    let moveApi: IMove;
    for (let i = 0; i < 4; i++) {
      do {
        movePosition = Math.floor(Math.random() * pokemonApi.moves.length);
        moveApi = await PokeAPI.Move.resolve(
          pokemonApi.moves[movePosition].move.name
        );
      } while (this.moveIsSet(pokemon, moveApi));

      pokemon.moves[i] = new Move({
        name: moveApi.name,
        accuracy: moveApi.accuracy,
        power: moveApi.power,
        pp: moveApi.pp,
        type: moveApi.type.name,
      });
    }
  }

  public moveIsSet(pokemon: Pokemon, move: IMove): Boolean {
    pokemon.moves.forEach((element) => {
      if (element.name === move.name || move.power === null) {
        return true;
      }
    });

    return false;
  }

  public async frenchName(pokename: string) {
    try {
      let offset = 0;
      let pokeFrench: Promise<{ id: number; fr: string }[]>;
      let poke;
      do{
        let pokeList = await PokeAPI.PokemonSpecies.list(100, offset);
        // console.log(pokeList);
        
        pokeFrench = Promise.all(
          pokeList.results.map(async (x) => {
            let pokefr = await PokeAPI.PokemonSpecies.resolve(x.name);
            // console.log(pokefr.id);
            
            // let idname = pokefr.names.indexOf(({language: {name: "fr" }} as IName))
            // console.log("index : "+idname);
            return { id: pokefr.id, fr: pokefr.names[4].name };
          })
        );
        
        if (Object.keys(await pokeFrench).length !== 0) {
          poke = (await pokeFrench).filter(
            (x) => x.fr.toLowerCase() === pokename.toLowerCase()
          );
          console.log(poke);
          
          if (poke.toString() != "") return poke;
        }
        offset += 100;
        console.log("offset " + offset);
      }while (poke == undefined || poke.toString() == "" && offset <= 1000);

      return null;
    } catch {
      return null;
    }
  }
}
