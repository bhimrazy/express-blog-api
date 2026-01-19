import type { NextFunction, Request, Response } from 'express';
import { postService } from './post.service.js';

export const postController = {
  getAll: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const posts = await postService.getAll();
      res.json({ success: true, data: posts });
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const post = await postService.getById(req.params.id as string);
      res.json({ success: true, data: post });
    } catch (error) {
      next(error);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const post = await postService.create(req.user!.userId, req.body);
      res.status(201).json({ success: true, data: post });
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const post = await postService.update(req.params.id as string, req.user!.userId, req.body);
      res.json({ success: true, data: post });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await postService.delete(req.params.id as string, req.user!.userId);
      res.json({ success: true, message: 'Post deleted successfully' });
    } catch (error) {
      next(error);
    }
  },
};
