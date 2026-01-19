import cors from 'cors';
import express, { type Express } from 'express';
import helmet from 'helmet';
import { errorHandler, requestLogger } from '@/common/middleware/index.js';
import { HttpError } from '@/common/utils/index.js';
import routes from '@/routes.js';

const app: Express = express();

// Security middleware
app.use(helmet());
app.use(cors());

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(requestLogger);

// Health check
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Routes
app.use('/api', routes);

// 404 handler
app.use((_req, _res, next) => {
  next(HttpError.notFound('Route not found'));
});

// Global error handler
app.use(errorHandler);

export default app;
