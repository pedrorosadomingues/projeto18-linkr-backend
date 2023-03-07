import express from 'express';
import signupRouter from './auth/signup.route.js';

const router = express.Router();
router.use(signupRouter);

export default router;
