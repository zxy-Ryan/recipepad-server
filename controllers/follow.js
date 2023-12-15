import * as dao from "../models/dao.js";

export const follow = async (req, res) => {
  const followerId = req.session["currentUser"]._id;
  const followingId = req.params.userId;
  const newFollow = await dao.createFollow({
    followerId,
    followingId,
  });
  res.json(newFollow);
};

export const unfollow = async (req, res) => {
  const followerId = req.session["currentUser"]._id;
  const followingId = req.params.userId;
  console.log(followerId);
  console.log(followingId);

  const status = await dao.deleteFollow(followerId, followingId);
  res.json(status);
};
