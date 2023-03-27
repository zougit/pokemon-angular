import { Sequelize } from "sequelize-typescript";
import { Todos } from "../models/todo";
import { User } from "../models/user";

const connection = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "",
  database: "testdb",
  logging: false,
  models: [Todos,User],
});

export default connection;