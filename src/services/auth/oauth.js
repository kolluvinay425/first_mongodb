import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
// import UserModel from "../users/schema.js";
// import { JWTAuthenticate } from "./tools.js";

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_OAUTH_ID,
    clientSecret: process.env.GOOGLE_OAUTH_SECRET,
    callbackURL: `http://localhost:3001/authors/googleRedirect`,
  },
  async (accessToken, refreshToken, googleProfile, passportNext) => {
    try {
      console.log(googleProfile);

      //   const user = await UserModel.findOne({ googleId: googleProfile.id });
    } catch (error) {
      passportNext(error);
    }
  }
);

export default googleStrategy;
