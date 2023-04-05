import { RequestHandler } from "express";
import { User } from "../models";
import { Team } from "../models/team";
import * as teamServices from '../services/team';


export const createTeam: RequestHandler = async (req, res, next) => {
    var team = await teamServices.create({ ...req.body });
    return res
      .status(201)
      .json({ message: "Team created successfully", data: team }).end();
};

export const getAllTeam: RequestHandler = async (req, res, next) => {
    const allTeam = await teamServices.getAllTeam();
    return res
      .status(200)
      .json({ message: "Team fetched successfully", data: allTeam }).end();
};

export const addPoke: RequestHandler = async (req, res, next) => {
    const team_id = req.body.team_id
    const poke = req.params.poke_id
    const team = await teamServices.addPoke(team_id,Number(poke));
    if (team != null && team != -1 && team != 6) {
      return res.status(200).json({ message: "Team fetched successfully", data: team }).end();
    } else if(team == -1) {
      return res.status(403).json({ message: "Already exist in this team"}).end()
    }else if(team == 6) {
      return res.status(403).json({ message: "A team can't have more than 6 pokemons"}).end()
    } else {
      return res.status(404).end()
    }
};
