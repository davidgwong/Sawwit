import { Comment } from "../models/comments";
import { Request, Response } from "express";

const editComment = async (req: Request, res: Response) => {
  const incomingEdits = await req.body;
  const user = await req.user;
  const commentId = req.params.commentid;
  const updateData = {
    content: incomingEdits.content,
  };

  try {
    const comment = await Comment.findById(commentId);
    if (comment?.creator_id.toString() === user?._id.toString()) {
      const editCommentResult = await Comment.findByIdAndUpdate(
        commentId,
        updateData,
        {
          new: true,
        }
      );
      res.status(200).json({ content: incomingEdits.content });
    } else {
      res
        .status(403)
        .json({ message: "Post cannot be edited (not original poster)." });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const deleteComment = async (req: Request, res: Response) => {
  const commentId = req.params.commentid;
  const user = await req.user;
  try {
    const comment = await Comment.findById(commentId);
    if (comment?.creator_id.toString() === user?._id.toString()) {
      const deleteCommentResult = await Comment.findByIdAndDelete(commentId);
      res.status(200).json({ message: "Comment was successfully deleted." });
    } else {
      res
        .status(403)
        .json({ message: "Comment cannot be deleted (not original poster)." });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getCommentsByPostId = async (req: Request, res: Response) => {
  const reqQuery = await req.query;
  try {
    const comments = await Comment.find({ post_id: reqQuery.postId });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: "error" });
  }
};

export { editComment, deleteComment, getCommentsByPostId };
