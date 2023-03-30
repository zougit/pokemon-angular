import { RequestHandler } from "express";
import { User } from "../models";
import { Team } from "../models/team";

export const createTeam: RequestHandler = async (req, res, next) => {
    var team = await Team.create({ ...req.body });
    return res
      .status(200)
      .json({ message: "Team created successfully", data: team });
};

export const getAllTeam: RequestHandler = async (req, res, next) => {
    const allTeam = await Team.findAll({include: {model: User}});
    return res
      .status(200)
      .json({ message: "Team fetched successfully", data: allTeam });
};
  