import express from 'express';
import { signin } from '../../controllers/signin.controller.js';
import validateSignin from '../../middlewares/signin.middleware.js';

const signinRouter = express.Router();

signinRouter.post('/', validateSignin,signin);

export default signinRouter;
