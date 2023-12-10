import mongoose from "mongoose";

const saveSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true},
  likedRecipeId: [String]
},
{ collection: "save" });



export default saveSchema;
