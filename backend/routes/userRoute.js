import express from "express";
import { registerUser, loginUser } from "../controllers/usercontroller.js";
import passport from "../config/passport.js";
import jwt from "jsonwebtoken";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

userRouter.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
        // Generate JWT for user
        const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);



        const redirectUrl = `http://localhost:3000/oauth-success?token=${encodeURIComponent(token)}&isAdmin=${encodeURIComponent(req.user.isAdmin)}&name=${encodeURIComponent(req.user.name)}&email=${encodeURIComponent(req.user.email)}&profileImage=${encodeURIComponent(req.user.profileImage)}`;
        res.redirect(redirectUrl);

    }
);

export default userRouter;
