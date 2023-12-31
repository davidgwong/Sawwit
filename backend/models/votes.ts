import mongoose from "mongoose";

const Schema = mongoose.Schema;

const VoteSchema = new Schema<Vote>({
  user_id: { type: Schema.Types.ObjectId, required: true },
  username: { type: String, required: true },
  post_id: { type: Schema.Types.ObjectId, required: true },
  post_title: { type: String, required: true },
  value: { type: Number, required: true },
});

const Vote = mongoose.model("Vote", VoteSchema, "votes");

export { Vote };