import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dataSource from "./src/data-source";
import { routes } from "./src/routes/routes";

const app = express();
dotenv.config();
dataSource.connect();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("", routes);
app.listen(process.env.PORT, () => {
  console.log(`Running http://localhost:${process.env.PORT}`);
});
