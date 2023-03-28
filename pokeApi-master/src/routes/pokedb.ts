import { Router } from "express";

import {
  createPoke,
  deletePoke,
  getAllPoke,
  updatePoke,
  getPokeById,
} from "../controllers/pokedb";

const pokedbrouter = Router();

pokedbrouter.post("/add/", createPoke);

pokedbrouter.get("/getAll/", getAllPoke);

pokedbrouter.get("/get/:id", getPokeById);

pokedbrouter.put("/update/:id", updatePoke);

pokedbrouter.delete("/delete/:id", deletePoke);

export {pokedbrouter};