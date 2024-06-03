import express from 'express';
import { createDSATopic, deleteDSATopic, getAllDSATopics, getQuestionsByTopicId, getSingleTopic } from '../controllers/dsaTopicController';

const router = express.Router();

router.post('/create-topic', createDSATopic);
router.delete('/delete-topic/:id', deleteDSATopic);
router.get('/all-topics',getAllDSATopics)
router.get('/topic/:id',getSingleTopic)
router.get('/topics/:topicId/questions', getQuestionsByTopicId);
export default router;
