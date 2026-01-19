import type { NextFunction, Request, Response } from 'express';
import { userService } from './user.service.js';

export const userController = {
  getAll: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await userService.getAll();
      res.json({ success: true, data: users });
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userService.getById(req.params.id as string);
      res.json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userService.update(req.params.id as string, req.body);
      res.json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await userService.delete(req.params.id as string);
      res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      next(error);
    }
  },
};
