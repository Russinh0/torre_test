import express from "express";
import searchController from "../controllers/searchController.js";
import { validateAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/saveQuery", validateAuth ,searchController.postQuery);
router.get("/getRecentQueries", validateAuth , searchController.getQueries);

export default router;
