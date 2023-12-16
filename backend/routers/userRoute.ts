import express from "express";
import * as database from "../controller/userController";

const router = express.Router();

router.get("/", async (req, res) => {
  const user = await req.user;
  res.render("signup", { messages: "", user, active: "signup" });
});

router.post("/", async (req, res) => {
  const newUser = await req.body;
  const uname = newUser.uname;
  const password = newUser.password;
  const user = await req.user;
  const unameExist = await database.getUserByUsername(uname);
  if (unameExist)
    res
      .status(409)
      .json("Username already exists. Please try another username.");
  else {
    await database.createUser(uname, password);
    res.status(201).json("Successfully signed up. Please log in.");
  }
});

export default router;
