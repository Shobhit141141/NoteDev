import { Request, Response, NextFunction } from 'express';
import admin from '../firebase'; // Update the path accordingly

interface CustomRequest extends Request {
  user?: any;
}

async function verifyToken(req: CustomRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("Unauthorized: Token not provided");
  }

  const [bearer, token] = authHeader.split(' ');
  if (bearer !== 'Bearer' || !token) {
    return res.status(401).send("Unauthorized: Invalid token format");
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).send("Unauthorized: Invalid token");
  }
}

export default verifyToken;
