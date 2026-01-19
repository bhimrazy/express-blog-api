import type { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { env, HttpError } from '../utils/index.js';

export interface JwtPayload {
  userId: string;
  email: string;
  role: 'admin' | 'user';
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
      id?: string;
    }
  }
}

export const authenticate: RequestHandler = (req, _res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    throw HttpError.unauthorized('No token provided');
  }

  const token = authHeader.slice(7);

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch {
    throw HttpError.unauthorized('Invalid or expired token');
  }
};

export const requireRole = (...roles: Array<'admin' | 'user'>): RequestHandler => {
  return (req, _res, next) => {
    if (!req.user) {
      throw HttpError.unauthorized('Authentication required');
    }

    if (!roles.includes(req.user.role)) {
      throw HttpError.forbidden('Insufficient permissions');
    }

    next();
  };
};
