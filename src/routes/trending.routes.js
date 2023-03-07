import { Router } from 'express';
import { getTrendingHashtags } from '../controllers/hashtags.js';

const router = Router();

router.get('/hashtag', getTrendingHashtags);

export default router;