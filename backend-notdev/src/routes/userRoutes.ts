import express from "express";
import {
  createUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController";
import verifyToken from "../middleware/GoogleAuthMiddleware";

const router = express.Router();

router.get("/profile", verifyToken, getUserProfile);
router.put("/profile", verifyToken, updateUserProfile);
router.post("/profile", verifyToken, createUser);

export default router;
