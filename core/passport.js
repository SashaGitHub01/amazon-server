import passport from "passport";
import { config } from "dotenv";
config()
import { User } from "../models/User.js";
import bcrypt from 'bcryptjs'
import { Strategy as LocalStrategy } from 'passport-local';

passport.use(new LocalStrategy(
   async function (email, password, done) {
      const user = await User.findOne({ email }).populate('rates orders');

      if (!user) return done(null, false);

      const verify = await bcrypt.compare(password, user.password)
      if (!verify) return done(null, false);

      return done(null, user);
   }
));

passport.serializeUser((id, done) => {
   done(null, id);
});

passport.deserializeUser(async (id, done) => {
   const user = await User.findById(id);

   done(null, user);
});

export { passport };