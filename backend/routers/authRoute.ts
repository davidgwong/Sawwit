import express from "express";
import passport from "../middleware/passport";
import { checkAuthenticated, forwardAuthenticated } from "../middleware/checkAuth";
const router = express.Router();

router.get("/", checkAuthenticated, async (req, res) => {
  const user = await req.user;
  const username = user?.username;
  const userId = user?._id;
  res.json({ isAuthenticated: req.isAuthenticated(), username: username, userId: userId });
});

router.get("/login", forwardAuthenticated, async (req, res) => {
  const user = await req.user;
  const username = user?.username;
  const userId = user?._id;
  res.json({ isAuthenticated: req.isAuthenticated(), username: username });
});

router.post("/login", passport.authenticate("local"), async (req, res) => {
  const username = await req.user?.username;
  const userId = await req.user?._id;
  res.status(200).json({ isAuthenticated: req.isAuthenticated(), username: username, userId: userId });
});

router.post("/logout", async (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
  const user = await req.user;
  const username = user?.username;
  const userId = user?._id;
  res.status(200).json({ isAuthenticated: req.isAuthenticated(), username: username, userId: userId });
});

export default router;
