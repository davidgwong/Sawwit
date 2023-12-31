import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CommentSchema = new Schema<Comment>({
  creator_id: { type: Schema.Types.ObjectId, required: true },
  creator_username: { type: String, required: true },
  content: { type: String, required: true },
  post_id: { type: Schema.Types.ObjectId, required: true },
  post_title: { type: String, required: true },
  timestamp: { type: Number, required: true },
});

const Comment = mongoose.model("Comment", CommentSchema, "comments");

export { Comment };
