import { createServer } from 'node:http';
import app from './app.js';
import { env, logger } from '@/common/utils/index.js';
import { closeConnection, testConnection } from '@/db/index.js';

const server = createServer(app);

async function start() {
  // Test database connection
  const isDbConnected = await testConnection();
  if (!isDbConnected) {
    logger.error('Database connection failed. Exiting...');
    process.exit(1);
  }

  // Start server
  server.listen(env.PORT, env.HOST, () => {
    logger.info(
      {
        port: env.PORT,
        host: env.HOST,
        env: env.NODE_ENV,
      },
      'Server listening',
    );
  });

  // Graceful shutdown
  const shutdown = async (signal: string) => {
    logger.info({ signal }, 'Shutting down...');

    server.close(() => {
      logger.info('HTTP server closed');
    });

    await closeConnection();
    process.exit(0);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

start().catch((err) => {
  logger.fatal({ err }, 'Failed to start server');
  process.exit(1);
});
