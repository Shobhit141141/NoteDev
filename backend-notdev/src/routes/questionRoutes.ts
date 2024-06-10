// routes/questionRoutes.ts

import express from "express";
import {
  createQuestion,
  deleteQuestion,
  filterQuestionsByDifficulty,
  getQuestionById,
  getQuestions,
  updateQuestion,
} from "../controllers/questionController";
import verifyToken from "../middleware/GoogleAuthMiddleware";
const router = express.Router();
router.post("/upload-question", verifyToken, createQuestion);
router.delete("/delete-question/:id", verifyToken, deleteQuestion);
router.get("/get-questions", verifyToken, getQuestions);
router.patch("/update-question/:id", verifyToken, updateQuestion);
router.get("/filter-by-difficulty", verifyToken, filterQuestionsByDifficulty);
router.get("/question/:id", verifyToken, getQuestionById);
export default router;
