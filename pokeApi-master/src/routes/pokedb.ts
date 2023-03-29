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
pokedbrouter.get("/getAll/:user", getAllPoke);

// pokedbrouter.get("/get/:id", getPokeById);
pokedbrouter.get("/get/:id&:user/", getPokeById);

pokedbrouter.put("/update/:id&:user/", updatePoke);

pokedbrouter.delete("/delete/:id&:user/", deletePoke);

export {pokedbrouter};