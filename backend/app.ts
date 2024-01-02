import express from "express";
import session from "express-session";
import passport from "./middleware/passport";
import cors from "cors";
import mongoose from "mongoose";

require("dotenv").config();
const PORT = process.env.PORT!;
const SECRET = process.env.SESSION_SECRET!;
const DB_NAME = process.env.DB_NAME!;
const DB_URI = process.env.MONGODB_URI!;

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(
  session({
    secret: SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // HTTPS Required
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

import authRoute from "./routers/authRoute";
import postsRoute from "./routers/postRouters";
import subsRouters from "./routers/subsRouters";
import commentRouters from "./routers/commentRouters";
import userRoute from "./routers/userRoute";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoute);
app.use("/posts", postsRoute);
app.use("/subgroups", subsRouters);
app.use("/comments", commentRouters);
app.use("/users", userRoute);

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(DB_URI, { dbName: DB_NAME });
  console.log("Connected to MongoDB");
  app.listen(PORT, () =>
    console.log(`server should be running at http://localhost:${PORT}/`)
  );
}
