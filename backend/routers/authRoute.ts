import express from "express";
import passport from "../middleware/passport";
import { forwardAuthenticated } from "../middleware/checkAuth";
const router = express.Router();

router.get("/login", forwardAuthenticated, async (req, res) => {
  res.json(req.isAuthenticated()? "yes" : "no");
});

router.post("/login", passport.authenticate("local"), async (req, res) => {
  const isAuthenticated = req.isAuthenticated()
  res.json(isAuthenticated);
});

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
  res.json("OK");
});

export default router;
