// routes/questionRoutes.ts

import express from "express";
import { createQuestion , deleteQuestion, filterQuestionsByDifficulty, getQuestionById, getQuestions, updateQuestion } from "../controllers/questionController";
const router = express.Router();
router.post("/upload-question", createQuestion);
router.delete("/delete-question/:id", deleteQuestion);
router.get("/get-questions", getQuestions);
router.patch('/questions/:id', updateQuestion);
router.get("/filter-by-difficulty", filterQuestionsByDifficulty);
router.get('/question/:id', getQuestionById);
export default router;
