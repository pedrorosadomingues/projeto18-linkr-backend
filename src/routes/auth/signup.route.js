import express from 'express';
import { signup } from '../../controllers/signup.controller.js';

const signupRouter = express.Router();

signupRouter.post('/sign-up', signup);

export default signupRouter;