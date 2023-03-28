import { RequestHandler } from "express";
import { Pokedb } from "../models";

export const createPoke: RequestHandler = async (req, res, next) => {
    var poke = await Pokedb.create({ ...req.body });
    return res
      .status(200)
      .json({ message: "poke created successfully", data: poke });
  };

  export const deletePoke: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    const deletedPoke: Pokedb | null = await Pokedb.findByPk(id);
    await Pokedb.destroy({ where: { id } });
    return res
      .status(200)
      .json({ message: "poke deleted successfully", data: deletedPoke });
  };
  
  export const getAllPoke: RequestHandler = async (req, res, next) => {
    const allPoke: Pokedb[] = await Pokedb.findAll();
    return res
      .status(200)
      .json({ message: "all poke fetched successfully", data: allPoke });
  };
  
  export const getPokeById: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    const poke: Pokedb | null = await Pokedb.findByPk(id);
    return res
      .status(200)
      .json({ message: "poke fetched successfully", data: poke });
  };
  
  export const updatePoke: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    await Pokedb.update({ ...req.body }, { where: { id } });
    const updatedPoke: Pokedb | null = await Pokedb.findByPk(id);
    return res
      .status(200)
      .json({ message: "poke updated successfully", data: updatedPoke });
  };