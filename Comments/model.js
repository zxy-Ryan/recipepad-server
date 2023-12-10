import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("comments", schema);
export default model;