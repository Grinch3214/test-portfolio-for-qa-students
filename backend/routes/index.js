import express from 'express';
import postsRouter from './posts.js';
import loginRouter from './login.js';

const router = express.Router();

router.use('/api/login', loginRouter);
router.use('/api/posts', postsRouter);

router.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
    path: req.path,
    method: req.method,
  });
});

export default router;
