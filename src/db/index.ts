import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env, logger } from '../common/utils/index.js';
import * as schema from './schema.js';

// Database connection
const connectionString = env.DATABASE_URL;

// For query purposes
const queryClient = postgres(connectionString);
export const db = drizzle(queryClient, { schema });

// Connection test
export async function testConnection(): Promise<boolean> {
  try {
    await queryClient`SELECT 1`;
    logger.info('✅ Database connection established');
    return true;
  } catch (error) {
    logger.error({ error }, '❌ Database connection failed');
    return false;
  }
}

// Graceful shutdown
export async function closeConnection(): Promise<void> {
  await queryClient.end();
  logger.info('Database connection closed');
}

// Re-export schema
export * from './schema.js';
