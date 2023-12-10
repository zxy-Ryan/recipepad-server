import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: false},
    recipeId: { type: String, required: true },
    commentContent: String,
    time: String,
  },
  { collection: "comments" });

export default commentSchema;

