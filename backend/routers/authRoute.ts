import express from "express";
import passport from "../middleware/passport";
import { forwardAuthenticated } from "../middleware/checkAuth";
const router = express.Router();

router.get("/", async (req, res) => {
  res.json({ isAuthenticated: req.isAuthenticated, username: req.user?.uname });
});

router.get("/login", forwardAuthenticated, async (req, res) => {
  const username = await req.user?.uname;
  res.json({ isAuthenticated: true, username: username });
});

router.post("/login", passport.authenticate("local"), async (req, res) => {
  const username = await req.user?.uname;
  res.json({ isAuthenticated: true, username: username });
});

router.get("/logout", async (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
  const username = await req.user?.uname;
  res.json({ isAuthenticated: false, username: username });
});

export default router;
