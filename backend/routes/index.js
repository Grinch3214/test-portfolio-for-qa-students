import express from 'express';
import postsRouter from './posts.js';

const router = express.Router();

router.use('/api/posts', postsRouter);

router.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
    path: req.path,
    method: req.method,
  });
});

export default router;
