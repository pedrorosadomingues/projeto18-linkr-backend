import { Router } from 'express';
import { getTrendingHashtags, addHashtags } from '../controllers/hashtags.controller.js';
import { userAuth } from '../middlewares/auth.middleware.js';

const trendingRoutes = Router();

trendingRoutes.get('/hashtag', getTrendingHashtags);
trendingRoutes.post('/hashtag', addHashtags);

export default trendingRoutes;
