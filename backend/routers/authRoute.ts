import express from "express";
import passport from "../middleware/passport";
import { forwardAuthenticated } from "../middleware/checkAuth";
const router = express.Router();

router.get("/", async (req, res) => {
  const username = await req.user?.uname;
  const userId = await req.user?.id;
  res.json({ isAuthenticated: req.isAuthenticated, username: username, userId: userId });
});

router.get("/login", forwardAuthenticated, async (req, res) => {
  const username = await req.user?.uname;
  res.json({ isAuthenticated: req.isAuthenticated, username: username });
});

router.post("/login", passport.authenticate("local"), async (req, res) => {
  const username = await req.user?.uname;
  const userId = await req.user?.id;
  res.status(200).json({ isAuthenticated: req.isAuthenticated, username: username, userId: userId });
});

router.post("/logout", async (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
  const username = await req.user?.uname;
  const userId = await req.user?.id;
  res.status(200).json({ isAuthenticated: req.isAuthenticated, username: username, userId: userId });
});

export default router;
