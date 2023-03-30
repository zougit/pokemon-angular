import {Express} from "express";
import { auth } from "../middleware/auth";
import { authRouter } from "./auth";
import { pokeRouter } from "./poke.router";
import todoRoutes from "./todo";
import {pokedbrouter} from "./pokedb";
import { teamrouter } from "./teams";

export function buildRoutes(app: Express){
    app.use("/auth", authRouter);
    app.use("/poke", pokeRouter);
    app.use("/todos", todoRoutes);
    app.use("/pokedb", pokedbrouter);
    app.use("/team", teamrouter);
}