import express from "express";
import genomeFavsController from "../controllers/genomeFavsController.js";
import { validateAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/addFav", validateAuth ,genomeFavsController.addFav);
router.get("/getFavs/:actualPage", validateAuth ,genomeFavsController.getFavs);
router.delete("/removeFav/:username", validateAuth ,genomeFavsController.removeFav);
router.post("/findByName/:actualPage",validateAuth,genomeFavsController.search)

export default router;
