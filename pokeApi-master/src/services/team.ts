import { Team } from "../models";

export async function create(team: Team) {
  try {
    return await Team.create(team);
  } catch (error) {
    throw error;
  }
}

export async function getAllTeam() {
  try {
    return await Team.findAll();;
  } catch (error) {
    throw error;
  }
}
