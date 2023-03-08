import express from 'express';
import { createPost, deletePost, getPosts } from '../controllers/posts.controller.js';
import { userAuth } from '../middlewares/auth.middleware.js';
import { scrapMetadata, validatePost } from '../middlewares/posts.middleware.js';

const postsRouter = express.Router();

postsRouter.post('/timeline', validatePost, userAuth, scrapMetadata, createPost);
postsRouter.get('/timeline', userAuth, getPosts);
postsRouter.delete('/timeline/:id', userAuth, deletePost);

export default postsRouter;