import {Express} from "express";
import { authRouter } from "./auth";
import { pokeRouter } from "./poke.router";
import todoRoutes from "./todo";

export function buildRoutes(app: Express){
    app.use("/poke", pokeRouter);
    app.use("/todos", todoRoutes);
    app.use("/auth", authRouter);
}