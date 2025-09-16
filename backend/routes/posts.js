import express from 'express';
import {
  getAllPosts,
  getSinglePost,
  createPost,
  incrementPostViews,
} from '../controllers/posts.js';

const router = express.Router();

router.get('/', getAllPosts);
router.get('/:id', getSinglePost);
// router.get('/:date', getDateWorkouts);
router.post('/', createPost);
router.patch('/:id/views', incrementPostViews);
// router.patch('/:id', updateWorkout);
// router.delete('/:id', deleteWorkouts);

export default router;
