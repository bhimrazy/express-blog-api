import { Router } from 'express';
import authRoutes from '@/modules/auth/auth.routes.js';
import userRoutes from '@/modules/user/user.routes.js';
import postRoutes from '@/modules/post/post.routes.js';

const router: Router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

export default router;
