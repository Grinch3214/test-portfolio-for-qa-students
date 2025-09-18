import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import {
  getAllPosts,
  getSinglePost,
  createPost,
  incrementPostViews,
  deletePost,
  updatePost,
} from '../controllers/posts.js';

const router = express.Router();

router.get('/', getAllPosts);
router.get('/:id', getSinglePost);
router.post('/', authMiddleware, createPost);
router.patch('/:id/views', incrementPostViews);
router.patch('/:id', updatePost);
router.delete('/:id', authMiddleware, deletePost);

export default router;
