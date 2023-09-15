
import express, { Router } from "express";
import './models/index.js'
import db from "./db/index.js";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import cors from 'cors'
dotenv.config();

const corsOptions={
  origin:'*',
  methods:['GET', 'PUT', 'POST','DELETE'],
  allowedHeaders:['Content-Type', 'Authorization'],
  credentials:true
}
const app = express();
app.use(cors(corsOptions))
app.use(express.json())
app.use("/api", routes);

db.sync({ force: false }).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`SERVER UP AT PORT ${process.env.PORT}`);
  });
});
