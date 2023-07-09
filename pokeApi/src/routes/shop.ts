import { Router } from "express";
import { getUserShop } from "../controllers/shop";

const shoprouter = Router();

shoprouter.get("/get/:user_id", getUserShop);

export {shoprouter}