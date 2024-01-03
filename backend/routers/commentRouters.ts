import express from "express";
import { deleteComment, editComment, getCommentsByPostId } from "../controller/commentController";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";

router.get("/", getCommentsByPostId);

router.post("/edit/:commentid", ensureAuthenticated, editComment);

router.post("/delete/:commentid", ensureAuthenticated, deleteComment);

export default router;
