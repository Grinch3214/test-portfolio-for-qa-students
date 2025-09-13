import express from 'express';
import { getAllPosts, getSinglePost } from '../controllers/posts.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllPosts);
router.get('/:id', getSinglePost);
// router.get('/:date', getDateWorkouts);
// router.post('/', postWorkouts);
// router.patch('/:id', updateWorkout);
// router.delete('/:id', deleteWorkouts);

export default router;
