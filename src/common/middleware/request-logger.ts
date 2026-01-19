import { randomUUID } from 'node:crypto';
import type { RequestHandler } from 'express';
import { logger } from '../utils/index.js';

export const requestLogger: RequestHandler = (req, res, next) => {
  const requestId = randomUUID();
  const startTime = Date.now();

  // Attach request ID to request object
  req.id = requestId;

  // Log incoming request
  logger.info({
    type: 'request',
    requestId,
    method: req.method,
    url: req.url,
    userAgent: req.get('user-agent'),
  });

  // Log response on finish
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    logger.info({
      type: 'response',
      requestId,
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
    });
  });

  next();
};
