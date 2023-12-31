import express from "express";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";
import {
  getPost,
  getAllPosts,
  createPost,
  addVote,
  deletePost,
  addComment,
  editPost,
} from "../controller/postController";

router.get("/", getAllPosts);

router.post("/create", ensureAuthenticated, createPost);

router.get("/show/:postid", getPost);

router.post("/edit/:postid", ensureAuthenticated, editPost);

router.post("/delete/:postid", ensureAuthenticated, deletePost);

router.post("/comment-create/:postid", ensureAuthenticated, addComment);

router.post("/vote/", ensureAuthenticated, addVote);

export default router;
