import pino from 'pino';
import { env } from './env.js';

const pinoConfig: any = {
  level: env.LOG_LEVEL,
  base: {
    env: env.NODE_ENV,
  },
  redact: ['req.headers.authorization', 'req.headers.cookie'],
};

if (env.NODE_ENV === 'development') {
  pinoConfig.transport = {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  };
}

export const logger = pino(pinoConfig);

export type Logger = typeof logger;
