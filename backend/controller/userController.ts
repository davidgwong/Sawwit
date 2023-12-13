import * as db from "../fake-db";

export const getUserByEmailIdAndPassword = async (
  uname: string,
  password: string
) => {
  let user = db.getUserByUsername(uname);
  if (user) {
    if (user.password === password) {
      return user;
    } else {
      return null;
    }
  }
};

export const getUserById = async (id: number) => {
  let user = db.getUser(id);
  if (user) {
    return user;
  }
  return null;
};

export async function createUser(uname: string, password: string) {
  return db.addUser(uname, password)
}

export const getUserByUsername = async (uname: string) => {
  let user = db.getUserByUsername(uname);
  if (user) {
    return user;
  }
  return null;
}; 