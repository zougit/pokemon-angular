// import {PokemonBuilder} from './models/builder'
// import PokeAPI from "pokeapi-typescript";
// import { BattleController } from './service';

import express from "express";
import { buildRoutes } from "./routes";
let cors = require('cors');

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
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

buildRoutes(app);


const port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log(`Listening on ${port}`);
});