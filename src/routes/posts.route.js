import express from 'express';
import { commentPost, createPost, deletePost, getPosts, getPostsFromUser, likePost, unlikePost, updatePost } from '../controllers/posts.controller.js';
import { userAuth } from '../middlewares/auth.middleware.js';
import { findPost, scrapMetadata, validateComment, validatePost } from '../middlewares/posts.middleware.js';

const postsRouter = express.Router();

postsRouter.post('/timeline', validatePost, userAuth, scrapMetadata, createPost);
postsRouter.get('/timeline', userAuth, getPosts);
postsRouter.get('/user/:id', userAuth, getPostsFromUser);
postsRouter.delete('/timeline/:id', userAuth, deletePost);
postsRouter.put('/timeline/:id', userAuth, updatePost);
postsRouter.delete('/unlike', userAuth, findPost, unlikePost)
postsRouter.post('/like', userAuth, findPost, likePost)
postsRouter.post('/comment/:id', userAuth, validateComment, commentPost)

export default postsRouter;