import express from 'express';
import { signup } from '../../controllers/signup.controller.js';
import validateSignup from '../../middlewares/signup.middleware.js';

const signupRouter = express.Router();

signupRouter.post('/sign-up', validateSignup, signup);

export default signupRouter;