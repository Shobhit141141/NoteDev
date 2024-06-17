import express from "express";
import cors from "cors";
import connectDB from "./src/config/db";
import questionRoutes from "./src/routes/questionRoutes";
import dsaTopicRoutes from "./src/routes/dsaTopicRoutes";
import userRoutes from "./src/routes/userRoutes";
import bodyParser from "body-parser";
import path from "path";
import passport from "passport";
import session from "express-session";
import "./src/passport";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
const FRONTEND_URL= process.env.FRONTEND_URL
app.use(
    cors({
        origin: FRONTEND_URL, // Replace with your actual frontend URL in production
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    })
);
const COOKIE_KEY = crypto.randomBytes(32).toString("hex");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());

app.use(
    session({
        secret: COOKIE_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 24 * 60 * 60 * 1000,  httpOnly: true, secure: process.env.NODE_ENV === 'production'},
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: `${FRONTEND_URL}`,
        successRedirect: `${FRONTEND_URL}`,
    })
);

app.get("/api/user", (req, res) => {
    res.send(req.user);
});

app.get("/auth/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect(`${FRONTEND_URL}`);
    });
});

app.get("/user/profile", (req, res) => {
    if (req.isAuthenticated()) {
        const token = req.user.token; 
        if(!token){
            res.status(401).json({ message: "Token not present" });
        }
        res.json({ user: req.user, token });
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
});

app.get("/", (req, res) => {
    res.send("API is live");
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/questions", questionRoutes);
app.use("/api/topics", dsaTopicRoutes);
app.use("/api/users", userRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
