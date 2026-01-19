import { Router } from 'express';
import { authenticate, requireRole } from '@/common/middleware/auth.js';
import { validate } from '@/common/middleware/validate.js';
import { userController } from './user.controller.js';
import { updateUserSchema } from './user.schema.js';

const router: Router = Router();

router.use(authenticate);

router.get('/', requireRole('admin'), userController.getAll);
router.get('/:id', userController.getById);
router.patch('/:id', validate(updateUserSchema), userController.update);
router.delete('/:id', requireRole('admin'), userController.delete);

export default router;
