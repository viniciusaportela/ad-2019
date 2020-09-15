import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

/**
 * ENV
 */
import config from "./config";

/**
 * MongoDB Setup
 */
const mongoUri = `mongodb+srv://${config.mongoUser}:${config.mongoPassword}@${config.mongoHost}/${config.mongoDatabase}`;
mongoose.connect(mongoUri);

/**
 * Express Setup
 */
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(config.port, () => {
  console.log("Server is up on port ${}");
});
