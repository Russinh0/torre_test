import express from "express";
import genomeFavsController from "../controllers/genomeFavsController.js";
import { validateAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/addFav", validateAuth ,genomeFavsController.addFav);
router.get("/getFavs", validateAuth ,genomeFavsController.getFavs);
router.delete("/removeFav/:username", validateAuth ,genomeFavsController.removeFav);

export default router;
