import express from 'express';
import signinRouter from './auth/signin.route.js';

const router = express.Router();
router.use(signinRouter);

export default router;
