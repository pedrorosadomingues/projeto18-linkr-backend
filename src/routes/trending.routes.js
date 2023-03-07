import { Router } from 'express';
import { getTrendingHashtags } from '../controllers/hashtags.controller.js';

const trendingRoutes = Router();

trendingRoutes.get('/hashtag', getTrendingHashtags);

export default trendingRoutes;
