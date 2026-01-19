import { Router } from 'express';
import { authenticate } from '@/common/middleware/auth.js';
import { validate } from '@/common/middleware/validate.js';
import { authController } from './auth.controller.js';
import { loginSchema, registerSchema } from './auth.schema.js';

const router: Router = Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.get('/me', authenticate, authController.getMe);

export default router;
