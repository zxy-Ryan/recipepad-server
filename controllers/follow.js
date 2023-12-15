import * as dao from "../models/dao.js";

export const follow = async (req, res) => {
    console.log(req.session["currentUser"]);
  const followerId = req.session["currentUser"]._id;
  const followingId = req.params.userId;
  const newFollow = await dao.createFollow({
    followerId,
    followingId,
  });
  res.json(newFollow);
};
