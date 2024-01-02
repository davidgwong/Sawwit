import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
  getUserByEmailIdAndPassword,
  getUserById,
} from "../controller/userController";

const localLogin = new LocalStrategy(
  {
    usernameField: "username",
    passwordField: "password",
  },
  async (
    username: string,
    password: string,
    done: (
      error: any,
      user?: Express.User | false,
      options?: { message: string }
    ) => void
  ) => {
    const user = await getUserByEmailIdAndPassword(username, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again.",
        });
  }
);

passport.serializeUser(function (
  user: Express.User,
  done: (err: any, user?: Express.User | false | null) => void
) {
  done(null, user._id);
});

passport.deserializeUser(async function (
  id: string,
  done: (err: any, user?: Express.User | false | null) => void
) {
  const user = await getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

export default passport.use(localLogin);
