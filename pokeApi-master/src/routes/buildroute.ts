import {Express} from "express";
import { auth } from "../middleware/auth";
// import todoRoutes from "./todo";
import { authRouter,pokeRouter,pokedbrouter,teamrouter,userRouter } from "./";

export function buildRoutes(app: Express){
    // app.use("/todos", todoRoutes);
    app.use("/auth", authRouter);
    app.use("/poke", pokeRouter);
    app.use("/pokedb", pokedbrouter);
    app.use("/team", teamrouter);
    app.use("/user", userRouter);
}