import { Pokedb, Team } from "../models";

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

export async function addPoke(team_id: number, id_poke: number) {
  try {
    const pokeupdate = await Pokedb.findOne({ where: { id_poke } });

    const poketeam = await Pokedb.findAll({ where: { team_id } });
    // console.log("taille : " + poketeam.length);

    if (pokeupdate != null && pokeupdate.team_id != team_id) {
      if (poketeam.length >= 6) return 6;

      await Pokedb.update({ team_id }, { where: { id_poke } });
      return Team.findOne({ where: { id: team_id }, include: [{ model: Pokedb ,attributes: ['id_poke','name','user_id']}] });
    } else if (pokeupdate != null && pokeupdate.team_id == team_id) {
      return -1;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}
