import { User } from "../models/users";

export const getUserByEmailIdAndPassword = async (
  username: string,
  password: string
) => {
  const user = await User.findOne({ username: username });
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

export const createUser = async (username: string, password: string) => {
  try {
    const newUser = new User({
      username: username,
      password: password,
    });

    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    return false;
  }
};

export const getUserByUsername = async (username: string) => {
  const user = await User.findOne({ username: username });
  if (user) {
    return user;
  }
  return null;
};
