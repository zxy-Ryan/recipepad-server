import mongoose from "mongoose";
import saveSchema from './saveSchema.js';
const saveModel = mongoose.model("save", saveSchema);
export default saveModel;