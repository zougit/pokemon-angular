import PokeAPI, { IPokemonSpecies } from "pokeapi-typescript";
import { IEvolution } from "../models/evolution";
import { PokeShop } from "../models";

export async function createPokeShop(shop_id: number) {
  const pokeList = await getPokeShop(shop_id);
  if (pokeList != null) {
    return await PokeShop.bulkCreate(pokeList as PokeShop[]);
  }
  return null;
}

export async function emptyPokeShop() {
  return await PokeShop.destroy({ where: { shop_id: 1 } });
}

async function getPokeShop(shop_id: number) {
  let random, randomlvl;
  let pokeList: any[] = [];
  let lvlList: any[] = [];

  while (pokeList.length <= 30) {
    random = Math.floor(Math.random() * (1000 - 1 + 1) + 1);
    randomlvl = Math.floor(Math.random() * 25);
    const pokeRandom = await PokeAPI.PokemonSpecies.resolve(random);
    // console.log(pokeList.filter(function(e) { return e.name === pokeRandom.name; }).length > 0);
    if (pokeList.filter(function (e) {return e.name === pokeRandom.name;}).length == 0) {
      pokeList.push(pokeRandom);
    }
    lvlList.push(randomlvl);
  }

  let pokeListMap = null;
  if (pokeList.length > 0) {
    pokeListMap = Promise.all(
      pokeList.map(async (x, i) => {
        let idEvoChain;
        let evo: IEvolution = { name: "", tier: 1 };
        if (x.evolution_chain != null) {
          // console.log(x.id);
          idEvoChain = x.evolution_chain.url.split("/");
          evo = await evolution(Number(idEvoChain[6]), x);
        }
        if (x.name == evo.name) {
          evo.name = "";
          evo.tier = 3;
        }
        let legendaryPrice = x.is_legendary ? 100 : 1;
        let info = {
          name: x.name,
          poke_id: x.id,
          price: 50 * evo.tier * legendaryPrice,
          lvl: lvlList[29 - i],
          shop_id,
        };
        return info;
      })
    );
  }
  return pokeListMap;
}

async function evolution(id: number, pokeSpecies: IPokemonSpecies) {
  const evolution_chain = await PokeAPI.EvolutionChain.resolve(id);
  let evolution: IEvolution = { name: "", tier: 1 };
  // console.log(evolution_chain.chain.evolves_to);
  if (evolution_chain.chain.evolves_to.length != 0) {
    if (pokeSpecies.evolves_from_species != null && evolution_chain.chain.evolves_to[0].evolves_to.length != 0) {
      evolution.name = evolution_chain.chain.evolves_to[0].evolves_to[0].species.name;
      evolution.tier = 2;
    } else if (pokeSpecies.evolves_from_species != null && evolution_chain.chain.evolves_to[0].evolves_to.length == 0) {
      evolution.name = "";
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
