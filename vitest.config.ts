import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts', 'src/**/__tests__/*.test.ts'],
    exclude: ['node_modules', 'dist'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      exclude: ['node_modules', 'dist', 'tests', '**/*.d.ts', '**/*.config.*'],
    },
    testTimeout: 30000,
    hookTimeout: 30000,
    env: {
      DATABASE_URL: 'postgres://test:test@localhost:5432/test',
      JWT_SECRET: 'test-secret-must-be-at-least-32-chars-long-example',
      JWT_EXPIRES_IN: '1d',
      NODE_ENV: 'test',
    },
    projects: [
      {
        name: 'unit',
        extends: true,
        test: {
          include: ['tests/unit/**/*.test.ts', 'src/**/__tests__/*.test.ts'],
        },
      },
      {
        name: 'integration',
        extends: true,
        test: {
          include: ['tests/integration/**/*.test.ts'],
        },
      },
      {
        name: 'e2e',
        extends: true,
        test: {
          include: ['tests/e2e/**/*.test.ts'],
        },
      },
    ] as any,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
