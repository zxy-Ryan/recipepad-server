import express from "express";
const router = express.Router();

import { follow } from "../controllers/follow.js";

router.post("/:userId", follow);

export default router;