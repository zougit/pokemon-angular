import { Router } from "express";
import { createTeam, getAllTeam } from "../controllers/team";

const teamrouter = Router();

teamrouter.post("/add", createTeam);

teamrouter.get("/getAll/", getAllTeam);

export {teamrouter}