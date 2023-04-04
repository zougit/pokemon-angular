import { Pokedb } from "../models";

export async function create(poke: Pokedb) {
    try {
      
      return await Pokedb.create(poke);

    } catch (error) {
      throw error;
    }
  }