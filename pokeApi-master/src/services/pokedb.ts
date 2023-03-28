import { Pokedb } from "../models";

export async function create(poke: Pokedb): Promise<void> {
    try {
      await Pokedb.create(poke);
    } catch (error) {
      throw error;
    }
  }