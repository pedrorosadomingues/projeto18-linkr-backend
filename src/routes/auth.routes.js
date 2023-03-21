import { Router } from 'express';
import signin from '../controllers/signin.controller.js';
import signup from '../controllers/signup.controller.js';
import validateSignin from '../middlewares/signin.middleware.js';
import validateSignup from '../middlewares/signup.middleware.js';
import signinAuth from '../auth/signin.auth.js';
import logout from '../controllers/logout.controller.js';
import { userAuth } from '../middlewares/auth.middleware.js';
import { getUser, getUserById, getUsers } from '../controllers/getUser.controller.js';

const authRoutes = Router();

authRoutes.post('/', validateSignin, signinAuth, signin);
authRoutes.post('/sign-up', validateSignup, signup);
authRoutes.delete('/logout', logout);
authRoutes.get('/get-user', userAuth, getUser);
authRoutes.post('/get-users', userAuth, getUsers);
authRoutes.post('/get-user-by-id', getUserById);

export default authRoutes;
