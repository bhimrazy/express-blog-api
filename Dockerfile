# syntax=docker/dockerfile:1

# ============================================
# Stage 1: Dependencies
# ============================================
FROM node:22-alpine AS deps
WORKDIR /app

# Enable corepack for pnpm
RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ============================================
# Stage 2: Builder
# ============================================
FROM node:22-alpine AS builder
WORKDIR /app
RUN corepack enable

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

# ============================================
# Stage 3: Production
# ============================================
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
RUN corepack enable

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 express

# Copy deps for production (no devDependencies)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

COPY --from=builder /app/dist ./dist

USER express

EXPOSE 3000

CMD ["node", "dist/server.js"]