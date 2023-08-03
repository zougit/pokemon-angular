import { Router } from "express";
import { createPokeShop, deletePokeShop } from "../controllers/pokeshop";
import { getUserShop } from "../controllers/shop";

const pokeShoprouter = Router();

pokeShoprouter.post("/add/:shop_id",createPokeShop);
// pokeShoprouter.get("/get", getUserShop);
pokeShoprouter.delete("/delete",deletePokeShop);

export {pokeShoprouter}