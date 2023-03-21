import { Router } from 'express';
import { countFollowings, follow, isFollowing, unfollow } from '../controllers/followers.controller.js';
import { userAuth } from '../middlewares/auth.middleware.js';

const followersRoute = Router();

followersRoute.post('/followers', userAuth, follow);
followersRoute.get('/followers', userAuth, countFollowings);
followersRoute.post('/get-follower-by-id', userAuth, isFollowing);
followersRoute.delete('/followers/:id', userAuth, unfollow);

export default followersRoute;