import { Router } from "express";
import { addPoke, createTeam, getAllTeam, getRandomTeam, getRandomTeamByType } from "../controllers/team";

const teamrouter = Router();

teamrouter.post("/add", createTeam);
teamrouter.get("/getAll/", getAllTeam);
teamrouter.get("/getRandom/", getRandomTeam);
teamrouter.get("/getRandomByType/:type", getRandomTeamByType);
teamrouter.put("/addpoke/:poke_id", addPoke);

export {teamrouter}