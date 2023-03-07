import express from 'express';
import signinAuth from '../../auth/signin.auth.js';
import { signin } from '../../controllers/signin.controller.js';
import validateSignin from '../../middlewares/signin.middleware.js';

const signinRouter = express.Router();

signinRouter.post('/', validateSignin, signinAuth, signin);

export default signinRouter;
