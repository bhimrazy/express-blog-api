import type { RequestHandler } from 'express';
import type { ZodSchema } from 'zod';

export const validate = (schema: ZodSchema): RequestHandler => {
  return (req, _res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
};
