import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { HttpError, logger } from '../utils/index.js';

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  // Log the error
  logger.error({
    err,
    method: req.method,
    url: req.url,
    body: req.body,
  });

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      error: 'Validation Error',
      details: err.errors.map((e) => ({
        path: e.path.join('.'),
        message: e.message,
      })),
    });
    return;
  }

  // Handle custom HTTP errors
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
    return;
  }

  // Handle unknown errors
  const statusCode = 500;
  const message =
    process.env.NODE_ENV === 'production'
      ? 'Internal Server Error'
      : err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
};
