import { Router } from 'express';
import trendingRoutes from './trending.routes.js';
import authRoutes from './auth.routes.js';

const router = Router();

router.use([trendingRoutes, authRoutes]);

export default router;