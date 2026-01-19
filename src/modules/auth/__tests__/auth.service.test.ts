import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authService } from '../auth.service.js';
import { db } from '@/db/index.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { HttpError } from '@/common/utils/index.js';

// Mock dependencies
vi.mock('@/db/index.js', () => ({
    db: {
        query: {
            users: {
                findFirst: vi.fn(),
            },
        },
        insert: vi.fn(),
    },
    users: {
        email: 'email',
        id: 'id',
    },
}));

vi.mock('argon2');
vi.mock('jsonwebtoken');

describe('AuthService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('register', () => {
        it('should register a new user successfully', async () => {
            // Arrange
            const input = { name: 'Test User', email: 'test@example.com', password: 'password123' };
            const hashedPassword = 'hashed_password';
            const createdUser = { ...input, id: 'user-id', role: 'user', password: hashedPassword, createdAt: new Date(), updatedAt: new Date() };

            (db.query.users.findFirst as any).mockResolvedValue(null);
            (argon2.hash as any).mockResolvedValue(hashedPassword);
            (db.insert as any).mockReturnValue({
                values: vi.fn().mockReturnValue({
                    returning: vi.fn().mockResolvedValue([createdUser]),
                }),
            });

            // Act
            const result = await authService.register(input);

            // Assert
            expect(result).not.toHaveProperty('password');
            expect(result.email).toBe(input.email);
            expect(db.query.users.findFirst).toHaveBeenCalled();
            expect(argon2.hash).toHaveBeenCalledWith(input.password);
        });

        it('should throw conflict error if email exists', async () => {
            // Arrange
            (db.query.users.findFirst as any).mockResolvedValue({ id: 'existing' });

            // Act & Assert
            await expect(authService.register({ name: 'Test', email: 'test@example.com', password: 'pw' }))
                .rejects.toThrow(HttpError);
        });
    });

    describe('login', () => {
        it('should return token and user on valid credentials', async () => {
            // Arrange
            const user = { id: 'user-id', email: 'test@example.com', password: 'hashed_password', role: 'user' };
            const token = 'jwt_token';

            (db.query.users.findFirst as any).mockResolvedValue(user);
            (argon2.verify as any).mockResolvedValue(true);
            (jwt.sign as any).mockReturnValue(token);

            // Act
            const result = await authService.login({ email: 'test@example.com', password: 'password123' });

            // Assert
            expect(result.token).toBe(token);
            expect(result.user.email).toBe(user.email);
        });
    });
});
