import {Express} from "express";
import { pokeRouter } from "./poke.router";

export function buildRoutes(app: Express){
    app.use("/poke", pokeRouter);
}