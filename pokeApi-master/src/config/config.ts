import { Sequelize } from "sequelize-typescript";
import { Todos } from "../models/todo";
import { User } from "../models";
import dotenv from 'dotenv';
dotenv.config();

const connection = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username:  process.env.USERDB,
  password:  process.env.PWDB,
  database: process.env.DB,
  logging: false,
  models: [Todos,User],
});

export default connection;