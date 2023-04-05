import express from "express";
import { PokemonBuilder } from "../models/builder";
import { PokeCardService } from "../services/pokeCard.services";

const pokeRouter = express.Router();

pokeRouter.get("/getPoke/:name", async (req, res) => {
  const builder = await PokemonBuilder.getInstance();
  if (req.params.name !== undefined) {
    const pokemon = await builder.create(req.params.name);
    if (pokemon === null) {
      res.status(400).end();
    } else {
      res.status(200).json(pokemon).end();
    }
  }

  res.status(400).end();
});

pokeRouter.get("/getPokeFR/:name", async (req, res) => {
  const builder = await PokemonBuilder.getInstance();
  if (req.params.name !== undefined) {

    const poke = await builder.frenchName(req.params.name);
    let pokeid = undefined;
    if (poke != undefined && poke != null) pokeid = poke[0].id;
    // console.log(pokeid);
    
    if (pokeid != undefined) {
      
      const pokemon = await builder.create(pokeid);
      
      if (pokemon === null) {
        res.status(400).end();
      } else {
        res.status(200).json(pokemon).end();
      }

    } else {
      res.status(404).end();
    }

  }
  res.status(400).end();
});

pokeRouter.get("/getAll", async (req, res) => {
  const pokeCardService = PokeCardService.getInstance();

  const pokeCard = await pokeCardService.getAll();

  if (pokeCard !== undefined) {
    res.status(200).json(pokeCard);
  } else {
    res.status(403).end();
  }
});

export { pokeRouter };
