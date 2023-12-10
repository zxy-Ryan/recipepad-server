import mongoose from 'mongoose';

const likesSchema = new mongoose.Schema({
  userId: { type: String, ref: 'Users', required: true },
  likedRecipeId: { type: String, required: true } 
});

export default mongoose.model('Like', likesSchema, 'like');