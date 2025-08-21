import passport from "passport";
dotenv.config();
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/user/google/callback"
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if user already exists
                let user = await userModel.findOne({ email: profile.emails[0].value });

                if (!user) {
                    // Create new user if not exists
                    user = await userModel.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: "", // not needed for Google users
                        profileImage: profile.photos[0].value,
                        isAdmin: false
                    });
                }else {
                    // Update profile image if changed
                    user.profileImage = profile.photos[0].value;
                    await user.save();
                }

                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);

// serialize & deserialize (optional if JWT used directly)
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    userModel.findById(id).then((user) => done(null, user));
});

export default passport;
