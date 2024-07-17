import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import fetch from "node-fetch";
import User from "./src/models/User";
import connectDB from "./src/config/db";
import questionRoutes from "./src/routes/questionRoutes";
import dsaTopicRoutes from "./src/routes/dsaTopicRoutes";
import userRoutes from "./src/routes/userRoutes";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies)
  })
);
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI =
  process.env.REDIRECT_URI || "http://localhost:5000/auth/google/callback";

app.get("/auth/google", (_req, res) => {
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=profile email&access_type=offline&prompt=consent`;
  res.redirect(authUrl);
});

app.get("/auth/google/callback", async (req, res) => {
  const { code } = req.query;
  if (!code || typeof code !== "string") {
    return res.status(400).json({ error: "Invalid code parameter" });
  }

  try {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID!,
        client_secret: GOOGLE_CLIENT_SECRET!,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }),
    });

    const data = await response.json();
    const accessToken = data.access_token;
    const refreshToken = data.refresh_token;
    const userResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const userData = await userResponse.json();

    const existingUser = await User.findOne({ uid: userData.id });
    if (!existingUser) {
      const newUser = new User({
        uid: userData.id,
        name: userData.name,
        email: userData.email,
        picture: userData.picture,
        refreshToken: refreshToken,
      });
      await newUser.save();
    } else {
      existingUser.refreshToken = refreshToken;
      await existingUser.save();
    }
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 3500 * 1000,
    });

    res.redirect(`${process.env.FRONTEND_URL}/?uid=${userData.id}`);
    // res.redirect(`${process.env.FRONTEND_URL}/?token=${accessToken}&uid=${userData.id}`)
  } catch (err) {
    console.error("Error fetching access token:", err);
    res.status(500).json({ error: "Failed to fetch access token" });
  }
});

app.post("/auth/refresh-token", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(400).json({ error: "Refresh token is missing" });
  }

  try {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID!,
        client_secret: GOOGLE_CLIENT_SECRET!,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error });
    }

    const newAccessToken = data.access_token;
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 3500 * 1000,
    });
    return res.status(200).json({ accessToken: newAccessToken });
  } catch (err) {
    console.error("Error refreshing access token:", err);
    res.status(500).json({ error: "Failed to refresh access token" });
  }
});
app.post("/auth/logout", (req, res) => {
  // Clear the cookies
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  return res.status(200).json({ message: "Successfully logged out" });
});

// app.get('/auth/user/profile', async (req, res) => {

//   const authHeader = req.headers['authorization'];

//   if (!authHeader) {
//     return res.status(401).json({ error: 'Authorization header is missing' });
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     if (!userResponse.ok) {
//       throw new Error('Failed to fetch user info');
//     }

//     const userData = await userResponse.json();
//     res.json({ user: userData });
//   } catch (err) {
//     console.error('Error fetching user profile:', err);
//     res.status(500).json({ error: 'Failed to fetch user profile' });
//   }
// });

app.get("/auth/user/profile", async (req, res) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    return res.status(401).json({ error: "Access token is missing" });
  }

  try {
    const userResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${accessToken}` }, // Use the access token from cookies
      }
    );

    if (!userResponse.ok) {
      throw new Error("Failed to fetch user info");
    }

    const userData = await userResponse.json();
    res.json({ user: userData });
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/questions", questionRoutes);
app.use("/api/topics", dsaTopicRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
