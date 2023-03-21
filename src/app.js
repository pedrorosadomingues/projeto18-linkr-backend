import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import trendingRoutes from './routes/trending.routes.js';
import authRoutes from './routes/auth.routes.js';
import postsRouter from './routes/posts.route.js';
import followersRoute from "./routes/followers.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use([trendingRoutes, authRoutes, postsRouter, followersRoute]);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
