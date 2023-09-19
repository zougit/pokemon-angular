
import express from "express";
import { buildRoutes } from "./routes/buildroute";
import {connection} from "./config/config";
import { PokeShop, Pokedb, Shop, Team, User } from "./models";
// import dotenv from 'dotenv';
// dotenv.config();
require('dotenv').config();
let cors = require("cors");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:4200" }));

buildRoutes(app);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).json({ message: err.message });
  }
);

connection.addModels([User,Pokedb,Team,PokeShop,Shop])

connection.sync()
.then(() => {
    console.log("Database successfully connected");
  })
  .catch((err) => {
    console.log("Error", err); 
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, function () {
  console.log(`Listening on ${port}`);
});

export {app,server}