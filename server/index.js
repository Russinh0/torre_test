"use strict";

import express from "express";
import db from "./db/index.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();


db.sync({ force: false }).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`SERVER UP AT PORT ${process.env.PORT}`);
  });
});
