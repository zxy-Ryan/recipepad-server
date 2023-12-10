import model from "./model.js";
import saveModel from "./saveModel.js";
export const createComment = (comment) => model.create(comment);
export const findAllComment = () => model.find();
export const findCommentByCommentId = (commentId) => model.findById(commentId);
export const findCommentByUserId = (userId) => model.findOne({ userId: userId });
export const findCommentByRecipeId = (recipeId) => model.find({ recipeId: recipeId });
export const deleteComment = (commentId) => model.deleteOne({ _id: commentId });





export const findSaveByUserId = (userId) => saveModel.findOne({ userId: userId });
export const deleteByUserId = (userId) => saveModel.deleteOne({ _id: userId });
export const updateSaveByUserId = (user) => saveModel.create(user);