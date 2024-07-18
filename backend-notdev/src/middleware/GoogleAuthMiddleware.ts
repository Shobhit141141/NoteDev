import { Request, Response, NextFunction } from "express";

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  // const authHeader = req.headers['authorization'];
  const frontendUid = req.headers["uid"]; // Assuming the frontend sends the uid in headers

  // if (!authHeader) {
  //   return res.status(401).json({ error: 'Authorization header is missing' });
  // }

  const accessToken = req.cookies.token;
  console.log(accessToken);
  try {
    // Verify access token with Google OAuth server
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v3/tokeninfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      return res.status(401).json({ error: "Invalid access token" });
    }
    // @ts-ignore
    const tokenInfo = await response.json();
    // @ts-ignore
    const tokenUid = tokenInfo.sub;

    if (tokenUid !== frontendUid) {
      return res.status(401).json({ error: "Unauthorized: UID mismatch" });
    }

    next();
  } catch (err) {
    console.error("Error verifying access token:", err);
    return res.status(500).json({ error: "Failed to verify access token" });
  }
};

export default verifyToken;
