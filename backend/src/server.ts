import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

import Routes from "./routes";

/**
 * ENV
 */
import config from "./config";

/**
 * MongoDB Setup
 */
const mongoUri = `mongodb+srv://${config.mongoUser}:${config.mongoPassword}@${config.mongoHost}/${config.mongoDatabase}`;
mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    /**
     * Express Setup
     */
    const app = express();

    app.use(bodyParser.json());
    app.use(cors());

    app.use("/v1", Routes);

    app.listen(config.port, () => {
      console.log(`Server is up on port ${config.port}`);
    });
  });
