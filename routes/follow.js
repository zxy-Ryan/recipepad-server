import express from "express";
const router = express.Router();

import { follow, unfollow } from "../controllers/follow.js";

router.post("/:userId", follow);
router.delete("/:userId", unfollow);

export default router;