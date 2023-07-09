import { RequestHandler } from "express";
import * as PokeShopServices from "../services/pokeShop";

export const createPokeShop: RequestHandler = async (req, res, next) => {
  const PokeShop = await PokeShopServices.createPokeShop(Number(req.params.shop_id));
  return res.status(201).json({ message: "PokeShop created successfully", data: PokeShop }).end();
};

export const deletePokeShop: RequestHandler = async (req, res, next) => {
  await PokeShopServices.emptyPokeShop();
  return res.status(201).json({ message: "PokeShop delete successfully" }).end();
};
