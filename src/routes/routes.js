import express from 'express';
import signinRouter from './auth/signin.route.js';
import signupRouter from './auth/signup.route.js';
import postsRouter from './posts/posts.route.js';

const router = express.Router();

router.use(signinRouter);
router.use(signupRouter);
router.use(postsRouter);

export default router;
