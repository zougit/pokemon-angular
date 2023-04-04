import { RequestHandler } from "express";
import { User, Team, Pokedb } from "../models";

export const getUser: RequestHandler = async (req, res, next) => {
  const user = await User.findOne({
    where: { id: req.params.id },
    // include: [{ model: Team }, { model: Pokedb }],
  });
  return res
    .status(200)
    .json({ message: "User fetched successfully", data: user });
};

export const getAllUser: RequestHandler = async (req, res, next) => {
  const alluser = await User.findAll({
    // include: [{ model: Team }, { model: Pokedb }],
  });
  return res
    .status(200)
    .json({ message: "User fetched successfully", data: alluser });
};

export const updateUser: RequestHandler = async (req, res, next) => {
  let id = req.params.id;
  let updateduser: User | null = await User.findOne({
    where: { id },
  });

  if (updateduser != null) {
    await User.update({ ...req.body }, { where: { id } });
    if (req.body.id != undefined && req.body.id != req.params.id) {
      id = req.body.id;
      updateduser = await User.findOne({where: { id },});
    }
    return res
      .status(200)
      .json({ message: "user updated successfully", data: updateduser });
  } else {
    return res.status(404);
  }
};
