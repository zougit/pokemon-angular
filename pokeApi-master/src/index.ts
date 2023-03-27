// import {PokemonBuilder} from './models/builder'
// import PokeAPI from "pokeapi-typescript";
// import { BattleController } from './service';

import express from "express";
import { buildRoutes } from "./routes";
import connection from "./config/config";
let cors = require("cors");


// async function main(){
//     // const eevee = await PokeAPI.Pokemon.resolve("eevee");
// //    console.log(eevee.sprites);

//     // const move = await PokeAPI.Move.resolve("tackle");
//     // console.log(move);

//     // const pokeBuilder = await PokemonBuilder.getInstance();
//     // const pokemon = [
//     //     await pokeBuilder.create("eevee"),
//     //     await pokeBuilder.create("bulbasaur"),
//     // ];

//     // console.log(pokemon);

//     // const battle = new BattleController(pokemon);

//     // await battle.battle();

// }

// main();

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

connection.sync()
.then(() => {
    console.log("Database successfully connected");
  })
  .catch((err) => {
    console.log("Error", err);
  });

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Listening on ${port}`);
});
