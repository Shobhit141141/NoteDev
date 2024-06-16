// src/passportConfig.ts
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Request } from "express";
import User from "./models/User";
import jwt from 'jsonwebtoken'; 
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user: any, done) => {
    done(null, user);
});

passport.use(
    new GoogleStrategy(
        {
            clientID:
                "33131181959-gfm3gu1kki5qq42njhio4sba3bva9i40.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://localhost:5000/auth/google/callback",
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
                console.log(formattedTime)
                let user = await User.findOne({ uid: id });
                if (!user) {
                    user = await User.create({
                        uid: id,
                        name: displayName,
                        email,
                        picture,
                        createdTime:formattedTime
                    });
                }
                const token = jwt.sign({ uid: user._id }, "jqhvhjvchjv@JWT_SECRET_KEY!", { expiresIn: '1d' });

                user.token=token;
                
                return done(null, user);
            } catch (err) {
                return done(err, undefined);
            }
        }
    )
);
