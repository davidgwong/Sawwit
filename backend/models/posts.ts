import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema<Post>({
  creator_id: { type: Schema.Types.ObjectId, required: true },
  creator_username: { type: String, required: true },
  content: { type: String, required: true },
  link: { type: String, required: true },
  subgroup: { type: String, required: true },
  timestamp: { type: Number, required: true },
  title: { type: String, required: true },
  score: { type: Number, required: true },
  votes: { type: Number, required: true },
});

PostSchema.virtual("id").get(function () {
  return this._id.toString();
});

const Post = mongoose.model("Post", PostSchema, "posts");

export { Post };
