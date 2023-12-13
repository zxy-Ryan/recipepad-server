import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

import { createRecipe, getRecipes, getRecipe } from "../controllers/recipe.js";

//methods diffrent, routes can be same
router.get("/:id", getRecipe);
router.get("/", getRecipes);
router.post("/", auth, createRecipe);

export default router;
