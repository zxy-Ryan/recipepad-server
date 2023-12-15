import express from "express";
const router = express.Router();

import { signup, signin, googleSignIn, deleteUser, findAllUsers, findUserById, updateUser, account, findUserByUserName, findFollowings, findFollowers, findLikedRecipes,signout } from "../controllers/user.js";

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/googleSignIn", googleSignIn);
router.get("/allUsers", findAllUsers);
router.get("/:userId", findUserById);
router.get("/:username", findUserByUserName);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);
router.post("/account", account);
router.get("/:userId/followings", findFollowings);
router.get("/:userId/followers", findFollowers);
router.get("/:userId/favorites", findLikedRecipes);
router.post("/signout", signout);

export default router;
