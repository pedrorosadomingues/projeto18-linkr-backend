import express from 'express';
import { signin } from '../../controllers/signin.controller.js';

const signinRouter = express.Router();

signinRouter.post('/', signin);

export default signinRouter;
