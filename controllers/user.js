import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";
import * as dao from "../models/dao.js";

const secret = "test";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    req.session["currentUser"] = oldUser;
    // use the jwt.sign() method to create a token
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, tel, introduction, role } = req.body;
  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      tel,
      introduction,
      role,
    });

    req.session["currentUser"] = result;
    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const googleSignIn = async (req, res) => {
  const { email, name } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });
    if (oldUser) {
      const result = { _id: oldUser._id.toString(), email, name, password: oldUser.password, tel: oldUser.tel, introduction: oldUser.introduction, role: oldUser.role };
      req.session["currentUser"] = result;
      const token = jwt.sign(
        { email: oldUser.email, id: oldUser._id },
        secret,
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).json({ result, token });
    }

    const result = await UserModal.create({
      email,
      name,
      password: "",
      tel: "",
      introduction: "",
      role: "regular",
    });
    req.session["currentUser"] = result;
    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  const status = await dao.deleteUser(req.params.userId);
  res.json(status);
};

export const findAllUsers = async (req, res) => {
  const users = await dao.findAllUsers();
  res.json(users);
};

export const findUserById = async (req, res) => {
  const user = await dao.findUserById(req.params.userId);
  res.json(user);
};

export const findUserByUserName = async (req, res) => {
  const user = await dao.findUserByUserName(req.params.username);
  res.json(user);
};

export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const status = await dao.updateUser(userId, req.body);
  const currentUser = await dao.findUserById(userId);
  req.session["currentUser"] = currentUser;
  res.json(status);
};

export const account = async (req, res) => {
  console.log(req.session);
  res.json(req.session["currentUser"]);
};

export const findFollowers = async (req, res) => {
  try {
    const userId = req.params.userId;
    const followers = await dao.findFollowers(userId);
    res.status(200).json(followers);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const findFollowings = async (req, res) => {
  try {
    const userId = req.params.userId;
    const followings = await dao.findFollowings(userId);
    res.status(200).json(followings);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const findLikedRecipes = async (req, res) => {
  try {
    const userId = req.params.userId;
    const likedRecipes = await dao.findLikedRecipes(userId);
    res.status(200).json(likedRecipes);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};
export const signout =  (req, res) => {
  req.session.destroy();
  res.json(200);
};