import { RequestHandler } from "express";
import { PokeShop, Shop } from "../models";

export const getUserShop: RequestHandler = async (req, res, next) => {
  const user_id = req.params.user_id;
  const shop: Shop | null = await Shop.findOne({ where: { user_id }, include: {model: PokeShop} });
  return res.status(200).json({ message: "shop fetched successfully", data: shop });
};
