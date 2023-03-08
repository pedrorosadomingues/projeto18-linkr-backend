import { Router } from 'express';
import { getTrendingHashtags } from '../controllers/hashtags.controller.js';
import { userAuth } from '../middlewares/auth.middleware.js';

const trendingRoutes = Router();

trendingRoutes.get('/hashtag', userAuth, getTrendingHashtags);

export default trendingRoutes;
