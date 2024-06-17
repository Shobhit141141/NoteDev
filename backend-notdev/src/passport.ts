// src/passportConfig.ts
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Request } from "express";
import User from "./models/User";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user: any, done) => {
    done(null, user);
});

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
        },
        async (accessToken, refreshToken, profile, done) => {
            const { id, displayName, emails, photos } = profile;
            const email = emails?.[0]?.value || "";
            const picture = photos?.[0]?.value || "";

            try {
                const now = new Date();
                const formattedTime = `${now
                    .getHours()
                    .toString()
                    .padStart(2, "0")}:${now
                    .getMinutes()
                    .toString()
                    .padStart(2, "0")}:${now
                    .getSeconds()
                    .toString()
                    .padStart(2, "0")}`;
                console.log(formattedTime);
                let user = await User.findOne({ googleId: id });
                if (!user) {
                    user = await User.create({
                        googleId: id,
                        name: displayName,
                        email,
                        picture,
                        createdTime: formattedTime,
                    });
                }
                const token = jwt.sign(
                    { googleId: user._id },
                    process.env.JWT_SECRET!,
                    { expiresIn: "1d" }
                );

                

                user.token = token;

                return done(null, user);
            } catch (err) {
                return done(err, undefined);
            }
        }
    )
);
