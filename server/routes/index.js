import express from "express";
import user from "./user.js";
import genomeFavs from "./genomeFavs.js";
import search from "./search.js";

const router = express.Router();

router.use("/user", user);
router.use("/genomeFavs", genomeFavs);
router.use("/search", search);

export default router;
