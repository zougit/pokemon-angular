
import express from "express";
import { buildRoutes } from "./routes";
import connection from "./config/config";
import dotenv from 'dotenv';
dotenv.config();
let cors = require("cors");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:4200" }));

buildRoutes(app);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).json({ message: err.message });
  }
);

connection.sync()
.then(() => {
    console.log("Database successfully connected");
  })
  .catch((err) => {
    console.log("Error", err);
  });

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Listening on ${port}`);
});
