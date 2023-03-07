import express from 'express';
import signinRouter from './auth/signin.route.js';
import signupRouter from './auth/signup.route.js';

const router = express.Router();

router.use(signinRouter);
router.use(signupRouter);

export default router;
