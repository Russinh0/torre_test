import express from "express";
import searchController from "../controllers/searchController.js";

const router = express.Router();

router.post("/saveQuery", searchController.postQuery);
router.get("/getRecentQueries", searchController.getQueries);

export default router;
