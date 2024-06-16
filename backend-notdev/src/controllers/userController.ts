import { Request, Response } from "express";
import admin, { auth } from "firebase-admin";
import User from "../models/User";
declare global {
    namespace Express {
        interface Request {
            user?: auth.DecodedIdToken;
        }
    }
}

export const getUserProfile = async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.uid) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await User.findById(req.user._id);
        console.log("User:", user);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: "oops server is down" });
    }
};

export const updateUserProfile = async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.uid) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user.uid,
            req.body,
            {
                new: true,
            }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({ message: "oops server is down" });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { uid, name, email, picture } = req.body;

        let user = await User.findOne({ uid });

        if (user) {
            return res.status(201).json("User already present");
        }

        if (!user) {
            user = new User({ uid, name, email, picture });
            await user.save();
        }

        // Return the user in the response
        return res.status(201).json(user);
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "oops server is down" });
    }
};
