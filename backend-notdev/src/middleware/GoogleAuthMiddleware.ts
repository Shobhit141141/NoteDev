// src/utils/verifyToken.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User'; // Adjust the path as per your project structure

interface DecodedToken {
  uid: string;
  // Add other relevant fields as needed
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  try {
    const decoded = jwt.verify(token,"jqhvhjvchjv@JWT_SECRET_KEY!") as DecodedToken;

    // Fetch user based on decoded token
    User.findById(decoded.uid)
      .then((user) => {
        if (!user) {
          return res.status(401).json({ message: 'Unauthorized' });
        }

        // Attach user and token to request object for further use
        // @ts-ignore
        req.user = user;
        // @ts-ignore
        req.token = token;

        next(); // Proceed to the next middleware or route handler
      })
      .catch((err) => {
        console.error('Error fetching user:', err);
        return res.status(500).json({ message: 'Internal server error' });
      });
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export default verifyToken;
