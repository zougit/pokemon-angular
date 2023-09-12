import { Sequelize } from "sequelize-typescript";
import { Pokedb, User, Team, PokeShop, Shop } from "../models";
import dotenv from 'dotenv';
dotenv.config();
// require('dotenv').config();

const connection = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username:  process.env.USERDB || 'root',
  password:  process.env.PWDB || '',
  database: process.env.DB || 'testdb',
  logging: false,
  models: [User,Pokedb,Team,PokeShop,Shop]
});
const connectionTest = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username:  process.env.USERDB || 'root',
  password:  process.env.PWDB || '',
  database: process.env.DBTEST || 'poketest',
  logging: false,
  models: [User,Pokedb,Team,PokeShop,Shop]
});

export {connection,connectionTest};