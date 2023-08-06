import { Router } from "express";
import { addPoke, createTeam, getAllTeam, getRandomTeam, getRandomTeamByType, getTeamById, delPoke } from "../controllers/team";

const teamrouter = Router();

teamrouter.post("/add", createTeam);
teamrouter.get("/getAll/", getAllTeam);
teamrouter.get("/getById/:id", getTeamById);
teamrouter.get("/getRandom/", getRandomTeam);
teamrouter.get("/getRandomByType/:type", getRandomTeamByType);
teamrouter.put("/addpoke/:poke_id", addPoke);
teamrouter.put("/delpoke/:poke_id", delPoke);

export { teamrouter };
