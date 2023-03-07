import { Router } from 'express';
import trendingRoutes from './trending.routes.js';

const router = Router();

router.use([trendingRoutes]);

export default router;