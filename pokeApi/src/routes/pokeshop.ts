import { Router } from "express";
import { createPokeShop, deletePokeShop } from "../controllers/pokeshop";

const pokeShoprouter = Router();

pokeShoprouter.post("/add/:shop_id",createPokeShop);
// pokeShoprouter.get("/get", createPokeShop);
pokeShoprouter.delete("/delete",deletePokeShop);

export {pokeShoprouter}