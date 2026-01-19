# Express Blog API Template

![CI](https://github.com/bhimrazy/express-blog-api/actions/workflows/ci.yml/badge.svg)
![License](https://img.shields.io/github/license/bhimrazy/express-blog-api)
![Node](https://img.shields.io/node/v/express-blog-api)

A production-grade, reusable REST API template built with:

- **Runtime**: Node.js 22 + TypeScript 5.7 (Strict ESM)
- **Framework**: Express 5.0
- **Database**: PostgreSQL + Drizzle ORM
- **Authentication**: JWT + Argon2
- **Validation**: Zod
- **Logging**: Pino (JSON structured logs)
- **Testing**: Vitest (Unit + Integration)
- **Tools**: Biome (Lint/Format), pnpm, Docker

## Features

- 🏗 **Feature-Based Architecture**: Modular structure (Auth, User, Post)
- 🔒 **Security First**: Helmet, CORS, strict validation, safe secrets
- 🐳 **Docker Ready**: Multi-stage builds for optimized production images
- 🧪 **Test Suites**: Pre-configured Vitest for unit and integration testing
- ⚡ **Performance**: Fast startup with `tsx`, efficient builds with `pnpm`

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+
- Docker (optional, for DB)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bhimrazy/express-blog-api.git
   cd express-blog-api
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Setup environment:
   ```bash
   cp .env.example .env
   ```

4. Start Database (Quick Start):
   ```bash
   docker-compose up -d db
   ```

5. Run Migrations:
   ```bash
   pnpm db:push
   ```

6. Start Server:
   ```bash
   pnpm dev
   ```

## Scripts

- `pnpm dev` - Start development server with watch mode
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm test` - Run all tests
- `pnpm lint` - Check for linting errors
- `pnpm format` - Auto-format code
- `pnpm db:studio` - Open Drizzle Studio to view data

## Project Structure

```
src/
├── common/             # Shared utilities & middleware
│   ├── middleware/
│   ├── utils/
│   └── types/
├── modules/            # Feature modules
│   ├── auth/           # Authentication logic
│   ├── user/           # User management
│   └── post/           # Blog posts
├── db/                 # Database schema & connection
├── app.ts              # App configuration
└── server.ts           # Entry point
```

## 🧪 Testing

The project uses **Vitest** with a scalable structure:

- **Unit Tests**: Co-located in `src/modules/*/__tests__/*.test.ts`.
- **Integration**: `tests/integration/*.test.ts` (API/DB interactions).
- **E2E**: `tests/e2e/*.test.ts` (Full user flows).

## 📏 Code Standards

- **File Naming**: strictly `kebab-case` (e.g., `user.controller.ts`, `auth-service.ts`).
- **Imports**: Use `@/` alias for src (e.g., `import { db } from '@/db'`).
- **Linting**: Biome is configured for strict type checking and formatting.

## API Documentation

- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `GET /api/users/me` - Get current user profile
- `GET /api/posts` - List posts

## License

MIT
