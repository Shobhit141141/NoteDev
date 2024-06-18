import { Request, Response, NextFunction } from 'express';

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header is missing' });
  }

  const accessToken = authHeader.split(' ')[1];
  try {
    // Verify access token with Google OAuth server
    const response = await fetch('https://www.googleapis.com/oauth2/v3/tokeninfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      return res.status(401).json({ error: 'Invalid access token' });
    }

    next();
  } catch (err) {
    console.error('Error verifying access token:', err);
    return res.status(500).json({ error: 'Failed to verify access token' });
  }
};

export default verifyToken;
