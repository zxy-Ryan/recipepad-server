import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

import { createRecipe, getRecipes, getRecipe,signout } from "../controllers/recipe.js";

//methods diffrent, routes can be same
router.get("/:id", getRecipe);
router.get("/", getRecipes);
router.post("/", auth, createRecipe);
router.post("/signout", signout);

export default router;
