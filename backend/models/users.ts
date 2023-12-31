import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema<Express.User>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema, "users");

export { User };
