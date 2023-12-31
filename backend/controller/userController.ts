import { User } from "../models/users";
import { Request, Response } from "express";

export const getUserByEmailIdAndPassword = async (
  username: string,
  password: string
) => {
  const regex = new RegExp(username, 'i');
  const user = await User.findOne({ username: { $regex: regex } });
  if (user) {
    if (user.password === password) {
      return user;
    } else {
      return null;
    }
  }
};

export const getUserById = async (id: string) => {
  const user = await User.findById(id);
  if (user) {
    return user;
  }
  return null;
};

export const createUser = async (req: Request, res: Response) => {
  const incomingData = await req.body;
  const username = incomingData.username;
  const password = incomingData.password;
  const regex = new RegExp(username, 'i');
  const usernameExists = await User.find({ username: { $regex: regex } });
  if (usernameExists.length > 0)
    res
      .status(409)
      .json("Username already exists. Please try another username.");
  else {
    try {
      const newUser = new User({
        username: username,
        password: password,
      });

      const createdUser = await newUser.save();
      res.status(201).json("Successfully signed up. Please log in.");
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const getUserByUsername = async (username: string) => {
  const regex = new RegExp(username, 'i');
  const user = await User.findOne({ username: { $regex: regex } });
  if (user) {
    return user;
  }
  return null;
};
