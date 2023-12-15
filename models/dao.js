import UserModel from "./user.js";
import FollowModel from "./follows.js";
import LikeModel from "./likes.js";

export const createUser = (user) => UserModel.create(user);
export const findAllUsers = () => UserModel.find();
export const findUserById = (userId) => UserModel.findById(userId);
export const findUserByUsername = (username) =>
  UserModel.findOne({ username: username });
export const findUserByCredentials = (usr, pass) =>
  UserModel.findOne({ username: usr, password: pass });
export const updateUser = (userId, user) =>
  UserModel.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => UserModel.deleteOne({ _id: userId });

export const findFollowers = (userId) => {
  return FollowModel.find({ followingId: userId }).populate("followerId");
};

export const findFollowings = (userId) => {
  return FollowModel.find({ followerId: userId }).populate("followingId");
};

export const findLikedRecipes = (userId) => {
    console.log(userId);
  return LikeModel.find({ userId: userId }).populate("likedRecipeId");
};

export const createFollow = (follow) => {
  FollowModel.create(follow);
};
