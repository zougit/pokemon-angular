import PokeAPI from "pokeapi-typescript";
import { Pokedb, Team } from "../models";
import { PokemonBuilder } from "../models/builder";

export async function create(team: Team) {
  try {
    return await Team.create(team);
  } catch (error) {
    throw error;
  }
}

export async function getAllTeam() {
  try {
    return await Team.findAll();
  } catch (error) {
    throw error;
  }
}

export async function getTeamById(id: string) {
  try {
    return await Pokedb.findAll({ where: { team_id : id } });
  } catch (error) {
    throw error;
  }
}

export async function getRandomTeam() {
  try {
    let random, randomlvl;
    let pokeList: any[] = [];
    let lvlList: any[] = [];
    const builder = await PokemonBuilder.getInstance();

    while (pokeList.length <= 6) {
      random = Math.floor(Math.random() * (1000 - 1 + 1) + 1);
      randomlvl = Math.floor(Math.random() * 25);
      const pokeRandom = await PokeAPI.Pokemon.resolve(random);
      // console.log(pokeList.filter(function(e) { return e.name === pokeRandom.name; }).length > 0);
      if (
        pokeList.filter((e) => {
          return e.name === pokeRandom?.name;
        }).length == 0
      ) {
        const poke = await builder.create(random);
        if (poke?.is_legendary == false) {
          pokeList.push(poke);
        }
      }
      lvlList.push(randomlvl);
    }
    return pokeList;
  } catch (error) {
    throw error;
  }
}

export async function getRandomTeamByType(type: string) {
  try {
    let random, randomlvl;
    let pokeList: any[] = [];
    let lvlList: any[] = [];
    const builder = await PokemonBuilder.getInstance();

    while (pokeList.length <= 6) {
      random = Math.floor(Math.random() * (1000 - 1 + 1) + 1);
      randomlvl = Math.floor(Math.random() * 25);
      const pokeRandom = await PokeAPI.Pokemon.resolve(random);
      // console.log(pokeList.filter(function(e) { return e.name === pokeRandom.name; }).length > 0);
      if (
        pokeList.filter((e) => {
          return e.name === pokeRandom.name;
        }).length == 0 &&
        pokeRandom.types[0].type.name == type
      ) {
        const poke = await builder.create(random);
        if (poke?.is_legendary == false) {
          pokeList.push(poke);
        }
      }
      lvlList.push(randomlvl);
    }
    return pokeList;
  } catch (error) {
    throw error;
  }
}

export async function addPoke(team_id: number, id_poke: number) {
  try {
    const pokeupdate = await Pokedb.findOne({ where: { id_poke } });

    const poketeam = await Pokedb.findAll({ where: { team_id } });
    // console.log("taille : " + poketeam.length);

    if (pokeupdate != null && pokeupdate.team_id != team_id) {
      if (poketeam.length >= 6) return 6;

      await Pokedb.update({ team_id }, { where: { id_poke } });
      return Team.findOne({ where: { id: team_id }, include: [{ model: Pokedb, attributes: ["id_poke", "name", "user_id"] }] });
    } else if (pokeupdate != null && pokeupdate.team_id == team_id) {
      return -1;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}
