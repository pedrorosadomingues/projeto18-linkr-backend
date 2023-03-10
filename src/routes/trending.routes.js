import { Router } from 'express';
import { getTrendingHashtags, addHashtags, getPostsByHashtag} from '../controllers/hashtags.controller.js';
import { userAuth } from '../middlewares/auth.middleware.js';

const trendingRoutes = Router();

trendingRoutes.get('/hashtag', getTrendingHashtags);
trendingRoutes.post('/hashtag', addHashtags);
trendingRoutes.get('/hashtag/:hashtag', getPostsByHashtag);

export default trendingRoutes;