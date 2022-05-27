import express from "express";
import { PokemonBuilder } from "../models/builder";
import { PokeCardService } from "../service/pokeCard.services";

const pokeRouter = express.Router();

pokeRouter.get('/getPoke/:name', async (req, res) => {
    const builder = await PokemonBuilder.getInstance();
    if(req.params.name !== undefined){
        const pokemon = await builder.create(req.params.name);
        if(pokemon === null){
            res.status(400).end();
        }
        else{
            res.status(200).json(pokemon).end();
        }

    }

    res.status(400).end();
});

pokeRouter.get('/getPokeById/:id', async (req, res) => {
    const builder = await PokemonBuilder.getInstance();
    if(req.params.id !== undefined){
        const pokemon = await builder.create(req.params.id);
        if(pokemon === null){
            res.status(400).end();
        }
        else{
            res.status(200).json(pokemon).end();
        }

    }

    res.status(400).end();
});

pokeRouter.get('/getAll', async (req, res) => {
    const pokeCardService = PokeCardService.getInstance();

    const pokeCard = await pokeCardService.getAll();

    if(pokeCard !== undefined){
        res.status(200).json(pokeCard);
    }else{
        res.status(403).end();
    }
});


export {
    pokeRouter
}