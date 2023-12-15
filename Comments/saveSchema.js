import mongoose from "mongoose";

const saveSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true},
  saveRecipe: [String]
},
{ collection: "save" });



export default saveSchema;
