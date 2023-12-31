// const { ensureAuthenticated } = require("../middleware/checkAuth");
import express from "express";
import { getPostsInSubgroup, getSubs } from "../controller/postController";
const router = express.Router();

router.get("/list", getSubs);

router.get("/show/:subname", getPostsInSubgroup);

export default router;
