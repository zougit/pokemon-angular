import {Express} from "express";
import { auth } from "../middleware/auth";
import { authRouter,pokeRouter,pokeShoprouter,pokedbrouter,shoprouter,teamrouter,userRouter } from ".";

export function buildRoutes(app: Express){
    app.use("/auth", authRouter);
    app.use("/poke", pokeRouter);
    app.use("/pokedb", pokedbrouter);
    app.use("/team", teamrouter);
    app.use("/user", userRouter);
    app.use("/pokeShop", pokeShoprouter);
    app.use("/shop", shoprouter);
}