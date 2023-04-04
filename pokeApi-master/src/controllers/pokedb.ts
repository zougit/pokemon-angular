import { RequestHandler } from "express";
import { Pokedb } from "../models";
import * as PokeServices from '../services/pokedb';

export const createPoke: RequestHandler = async (req, res, next) => {
  var poke = await PokeServices.create({ ...req.body });
  return res
    .status(201)
    .json({ message: "poke created successfully", data: poke });
};

export const getAllPoke: RequestHandler = async (req, res, next) => {
  const user_id = req.params.user;
  let allPoke: Pokedb[];
  if (user_id !== undefined) {
    // allPoke = await Pokedb.findAll({include : [{model: UserPokemon},{model: TeamPokemon}]});
    allPoke = await Pokedb.findAll();
  } else {
    allPoke = await Pokedb.findAll();
  }
  return res
    .status(200)
    .json({ message: "all poke fetched successfully", data: allPoke });
};

export const getPokeById: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  const user_id = req.params.user;
  const poke: Pokedb | null = await Pokedb.findOne({ where: { id } });
  return res
    .status(200)
    .json({ message: "poke fetched successfully", data: poke });
};

export const updatePoke: RequestHandler = async (req, res, next) => {
  let id = req.params.id;
  let user_id = req.params.user;
  const pokeupdate: Pokedb | null = await Pokedb.findOne({
    where: { id },
  });
  
  if (pokeupdate != null) {
    await Pokedb.update({ ...req.body }, { where: { id } });
    id = req.body.id;
    user_id = req.body.user_id;
    const updatedPoke: Pokedb | null = await Pokedb.findOne({
      where: { id },
    });
    return res
      .status(200)
      .json({ message: "poke updated successfully", data: updatedPoke });
  } else {
    return res.status(404);
  }
};

export const deletePoke: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  const user_id = req.params.user;
  const deletedPoke: Pokedb | null = await Pokedb.findOne({
    where: { id },
  });
  
  if (deletedPoke != null) {
    await Pokedb.destroy({ where: { id} });
    return res
      .status(200)
      .json({ message: "poke deleted successfully", data: deletedPoke });
  } else {
    return res.status(404);
  }
};
