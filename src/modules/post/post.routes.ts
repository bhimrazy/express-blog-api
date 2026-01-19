import { Router } from 'express';
import { authenticate } from '@/common/middleware/auth.js';
import { validate } from '@/common/middleware/validate.js';
import { postController } from './post.controller.js';
import { createPostSchema, updatePostSchema } from './post.schema.js';

const router: Router = Router();

router.get('/', postController.getAll);
router.get('/:id', postController.getById);

// Protected routes
router.use(authenticate);
router.post('/', validate(createPostSchema), postController.create);
router.patch('/:id', validate(updatePostSchema), postController.update);
router.delete('/:id', postController.delete);

export default router;
