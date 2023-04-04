import { Router } from "express";

import * as pokeControllers from "../controllers/pokedb";

const pokedbrouter = Router();

pokedbrouter.post("/add/", pokeControllers.createPoke);

pokedbrouter.get("/getAll/", pokeControllers.getAllPoke);
pokedbrouter.get("/getAll/:user", pokeControllers.getAllPoke);

// pokedbrouter.get("/get/:id", getPokeById);
pokedbrouter.get("/get/:id&:user/", pokeControllers.getPokeById);

pokedbrouter.put("/update/:id&:user/", pokeControllers.updatePoke);

pokedbrouter.delete("/delete/:id&:user/", pokeControllers.deletePoke);

export {pokedbrouter};