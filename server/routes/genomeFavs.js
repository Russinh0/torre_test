import express from "express";
import genomeFavsController from "../controllers/genomeFavsController.js";

const router = express.Router();

router.post("/addFav", genomeFavsController.addFav);
router.get("/getFavs", genomeFavsController.getFavs);
router.delete("/removeFav", genomeFavsController.removeFav);

export default router;
