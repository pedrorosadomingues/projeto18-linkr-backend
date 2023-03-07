import { Router } from 'express';
import signin from '../controllers/signin.controller.js';
import signup from '../controllers/signup.controller.js';
import validateSignin from '../middlewares/signin.middleware.js';
import validateSignup from '../middlewares/signup.middleware.js';
import signinAuth from '../auth/signin.auth.js';

const router = Router();

router.post('/', validateSignin, signinAuth, signin);
router.post('/sign-up', validateSignup, signup);

export default router;