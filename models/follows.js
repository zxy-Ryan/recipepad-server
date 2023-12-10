import mongoose from 'mongoose';

const followsSchema = new mongoose.Schema({
  followerId: { type: String, ref: 'Users', required: true },
  followingId: { type: String, ref: 'Users', required: true }
});

export default mongoose.model('Follow', followsSchema, 'follows');
