import { Router } from 'express';
import signin from '../controllers/signin.controller.js';
import signup from '../controllers/signup.controller.js';
import validateSignin from '../middlewares/signin.middleware.js';
import validateSignup from '../middlewares/signup.middleware.js';
import signinAuth from '../auth/signin.auth.js';
import logout from '../controllers/logout.controller.js';

const authRoutes = Router();

authRoutes.post('/', validateSignin, signinAuth, signin);
authRoutes.post('/sign-up', validateSignup, signup);
authRoutes.delete('/logout', logout);

export default authRoutes;
