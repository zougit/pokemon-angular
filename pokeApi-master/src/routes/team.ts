import { Router } from "express";
import { addPoke, createTeam, getAllTeam } from "../controllers/team";

const teamrouter = Router();

teamrouter.post("/add", createTeam);
teamrouter.get("/getAll/", getAllTeam);
teamrouter.put("/addpoke/:poke_id", addPoke);

export {teamrouter}