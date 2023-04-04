import { RequestHandler } from "express";
import { User } from "../models";
import { Team } from "../models/team";
import * as teamServices from '../services/team';


export const createTeam: RequestHandler = async (req, res, next) => {
    var team = await teamServices.create({ ...req.body });
    return res
      .status(201)
      .json({ message: "Team created successfully", data: team });
};

export const getAllTeam: RequestHandler = async (req, res, next) => {
    const allTeam = await teamServices.getAllTeam();
    return res
      .status(200)
      .json({ message: "Team fetched successfully", data: allTeam });
};
  