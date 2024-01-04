import express from "express";
import session from "express-session";
import passport from "./middleware/passport";
import cors from "cors";
import mongoose from "mongoose";
import MongoStore from 'connect-mongo'

require("dotenv").config();
const PORT = process.env.PORT!;
const SECRET = process.env.SESSION_SECRET!;
const DB_NAME = process.env.DB_NAME!;
const DB_URI = process.env.MONGODB_URI!;
const SESSION_DB_NAME = process.env.SESSION_DB_NAME!;
const ORIGIN = process.env.ORIGIN!;

const app = express();
app.use(cors({ credentials: true, origin: ORIGIN }));
app.use(
  session({
    secret: SECRET,
    store: MongoStore.create({
      mongoUrl: DB_URI,
      dbName: SESSION_DB_NAME,
    }),
    resave: true,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // HTTPS Required
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});
app.use(limiter);

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
    console.log(`server should be running at ${PORT}/`)
  );
}
