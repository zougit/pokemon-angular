import { Sequelize } from "sequelize-typescript";
import { Todos } from "../models/todo";
import { Pokedb, User, Team } from "../models";
import dotenv from 'dotenv';
dotenv.config();

const connection = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username:  process.env.USERDB,
  password:  process.env.PWDB,
  database: process.env.DB,
  logging: false,
  models: [User,Pokedb,Team]
});

export default connection;