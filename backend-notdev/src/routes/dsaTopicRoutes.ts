import express from 'express';
import { createDSATopic, deleteDSATopic, getAllDSATopics } from '../controllers/dsaTopicController';

const router = express.Router();

router.post('/create-topic', createDSATopic);
router.delete('/delete-topic/:id', deleteDSATopic);
router.get('/all-topics',getAllDSATopics)
export default router;
