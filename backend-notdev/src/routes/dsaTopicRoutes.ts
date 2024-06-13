import express from "express";
import {
  createDSATopic,
  deleteDSATopic,
  getAllDSATopics,
  getQuestionsByTopicId,
  getSingleTopic,
  patchDSATopic,
} from "../controllers/dsaTopicController";
import verifyToken from "../middleware/GoogleAuthMiddleware";

const router = express.Router();

router.post("/create-topic", verifyToken, createDSATopic);
router.delete("/delete-topic/:id", verifyToken, deleteDSATopic);
router.get("/all-topics", verifyToken, getAllDSATopics);
router.get("/topic/:id", verifyToken, getSingleTopic);
router.get("/topics/:topicId/questions", verifyToken, getQuestionsByTopicId);
router.patch("/update/:id", verifyToken, patchDSATopic);
export default router;
